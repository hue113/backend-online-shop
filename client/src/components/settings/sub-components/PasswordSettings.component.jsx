import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../custom-button/Button.component';
import { updateUserPassword } from '../../../redux/user/user.actions';
import { validatePasswords } from '../../../utils/helper';

const PasswordSettings = ({ updateUserPassword }) => {
  const [passwords, setPasswords] = useState({
    passwordCurrent: '12345678',
    password: '12345678',
    passwordConfirm: '12345678',
  });
  const { passwordCurrent, password, passwordConfirm } = passwords;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validatePasswords(password, passwordConfirm);
    if (result === false) return;
    updateUserPassword(passwords);
  };

  return (
    <>
      <div className="password-settings">
        <h2 className="title bold py-5 mb-5">Password Change</h2>
        <div className="field mb-5">
          <h5 className="label mb-4 mx-2">Current Password</h5>
          <input
            className="input"
            type="password"
            name="passwordCurrent"
            value={passwordCurrent}
            onChange={handleChange}
          />
        </div>
        <div className="field mb-5">
          <h4 className="label mb-4 mx-2">New Password</h4>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="field mb-5">
          <h4 className="label mb-4 mx-2">Confirm New Password</h4>
          <input
            className="input"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="py-4 text-md-right text-sm-center" onClick={(e) => handleSubmit(e)}>
        <Button name="Save Change" styleClass="round color lighter" />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUserPassword: (passwords) => dispatch(updateUserPassword(passwords)),
});
export default connect(null, mapDispatchToProps)(PasswordSettings);
