import React, { useState, useEffect } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const BillingDetails = ({ setPaymentDetails }) => {
  const [card, setCard] = useState({
    name: '',
    cardNumber: '',
    mmyy: '',
    cvv: '',
    addressLine: '',
    postal: '',
    country: 'Canada',
    state: '',
  });
  const { name, cardNumber, mmyy, cvv, addressLine, postal, country, state } = card;

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  useEffect(() => {
    setPaymentDetails(card);
    return () => {};
  }, [card, setPaymentDetails]);

  return (
    <div className="section billing-details">
      <h3 className="bold my-5">Billing Details</h3>
      <div className="d-flex ml-3">
        <h4 className="col-6 label">Country*</h4>
        <h4 className="col-6 label">Province*</h4>
      </div>
      <div className="d-flex flex-wrap justify-content-around select-country">
        <div className="col-5 option">
          <CountryDropdown
            value={country}
            onChange={(val) => setCard({ ...card, country: val, state: '' })}
          />
        </div>
        <div className="col-5 option">
          <RegionDropdown
            country={country}
            value={state}
            onChange={(val) => setCard({ ...card, state: val })}
          />
        </div>
      </div>

      <div className="form p-5  my-5">
        <input
          className="input"
          name="name"
          value={name}
          onChange={handleCardChange}
          placeholder="Name on Card"
        />
        <input
          className="input"
          name="cardNumber"
          value={cardNumber}
          onChange={handleCardChange}
          placeholder="Card Number"
        />
        <div className="d-flex ">
          <input
            className="input mr-5"
            name="mmyy"
            value={mmyy}
            onChange={handleCardChange}
            placeholder="MM / YY"
          />
          <input
            className="input w-50"
            name="cvv"
            value={cvv}
            onChange={handleCardChange}
            placeholder="CVV"
          />
        </div>
        <input
          className="input"
          name="addressLine"
          value={addressLine}
          onChange={handleCardChange}
          placeholder="Address Line"
        />
        <input
          className="input"
          name="postal"
          value={postal}
          onChange={handleCardChange}
          placeholder="Zip / Postal Code"
        />
        <div className="mt-4">
          <input
            type="checkbox"
            id="shippingAddress"
            name="shippingAddress"
            defaultChecked
            onChange={() => console.log('Hi! I has not implemented this feature yet :D')}
          />
          <label htmlFor="shippingAddress" className="ml-4">
            Shipping Address is the same as billing address
          </label>
        </div>

        <div className="secure-connection m-4 d-flex justify-content-center align-items-end">
          <i className="bi bi-shield-lock-fill icon" />
          <h5 className="ml-2">Secure Connection</h5>
        </div>
      </div>

      <div className="test-card color">
        <span className="">
          *Please use the following mock credit card for testing payments:*
        </span>
        <div className="pl-5 my-3">
          Address: any random place
          <br />
          Name on Card: any name
          <br />
          Card Number: 4242 4242 4242 4242
          <br />
          MM/YY: 01/23
          <br />
          CVV: 123
          <br />
          Zip: 999999
        </div>
        <span className="">
          *For testing purpose, shipping address and billing address will be the same. No
          validation for card also.*
        </span>
      </div>
    </div>
  );
};

export default BillingDetails;
