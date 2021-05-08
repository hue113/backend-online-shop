import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

const Dashboard = ({ setSelection, currentUser }) => {
  return (
    <div className="dashboard p-0">
      <div className="dashboard-wrapper d-flex flex-lg-column flex-row p-5">
        <div className="profile-picture mb-5 mx-auto">
          <div className="avatar mb-4">
            <img src={currentUser.photo} alt="user profile" />
          </div>
          <h4 className="name bold text-center">{currentUser.name}</h4>
          <h4 className="points text-center mt-3">{currentUser.points} points</h4>
        </div>
        <div className="options">
          <div className="item py-4" onClick={() => setSelection('orders')}>
            <i className="bi bi-cart4 icon mr-4" />
            My Orders
          </div>
          <div className="item py-4" onClick={() => setSelection('reviews')}>
            <i className="bi bi-star icon mr-4" />
            My Reviews
          </div>
          <div className="item py-4" onClick={() => setSelection('payment')}>
            <i className="bi bi-credit-card icon mr-4" />
            Payment Information
          </div>
          <div className="item py-4" onClick={() => setSelection('settings')}>
            <i className="bi bi-gear-fill icon mr-4" />
            Settings
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Dashboard);
