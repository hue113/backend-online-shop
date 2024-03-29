import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../../../components/custom-button/Button.component';
import { selectCartTotal, selectCartItems } from '../../../redux/cart/cart.selectors';
import OrderItemCard from './OrderItemCard.component';

const OrderSummary = ({ cartTotal, cartItems, handleSubmit }) => {
  const shipping = Number(5.18);
  let OrderTotal;
  if (cartTotal * 1 > 50 || cartTotal * 1 === 0) {
    OrderTotal = cartTotal;
  } else OrderTotal = (cartTotal * 1 + shipping).toFixed(2);

  return (
    <div className="section order-summary">
      <div className="inner mt-5 px-5 py-3">
        <h3 className="bold my-5">Order Summary</h3>
        <div className="line row">
          <span className="col-7 text-center">PRODUCT</span>
          <span className="col-5 text-center">TOTAL</span>
        </div>

        {cartItems.map((el, index) => (
          <OrderItemCard product={el.item} order={el.order} key={index} />
        ))}

        <div className="line row">
          <span className="col-7 bold">Cart Subtotal</span>
          <span className="col-5 text-center bold">${cartTotal}</span>
        </div>
        <div className="line row">
          <span className="col-7 bold">Shipping & Handling:</span>
          <span className="col-5 text-center bold">
            {cartTotal > 50 ? 'Free' : `$ ${shipping}`}
          </span>
        </div>
        <div className="row total mb-4 mt-3">
          <span className="col-7 bold">Order Total</span>
          <span className="col-5 text-center bold color">${OrderTotal}</span>
        </div>
        <h5 className="terms">
          By completing your purchase you agree to these Terms of Service.
        </h5>
        <div className="text-center my-5">
          <Button
            styleClass="color square mx-4"
            name="Complete Payment"
            onClick={() => handleSubmit(cartItems)}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(OrderSummary);
