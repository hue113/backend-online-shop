import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../custom-button/Button.component';
import CartItem from './sub-component/CartItem.component';

import {
  selectCartLength,
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

const CartList = ({ toggleCart, cartLength, cartTotal, cartItems }) => {
  return (
    <div className="cart-list">
      <div className="cart-list-inner d-flex flex-column p-5">
        <div className="close-btn px-4 py-3" onClick={toggleCart}>
          <i className="bi bi-x-circle" />
        </div>

        <h3 className="title my-3 text-center">
          Cart List {cartLength === 0 ? '' : `(${cartLength})`}
        </h3>
        <div className="cart-item-wrapper w-100">
          {cartLength === 0 && cartItems ? (
            <div className="text-center my-5">Your Cart is Empty</div>
          ) : (
            <div>
              {cartItems.map((el, i) => (
                <CartItem product={el.item} order={el.order} key={`${el.item.sku}${i}`} />
              ))}
            </div>
          )}
        </div>

        <div className="subtotal pt-1 d-flex justify-content-between">
          <h4 className="title bold">Sub Total</h4>
          <h4 className="total bold mr-2">${cartTotal}</h4>
        </div>

        <div className="text-center mt-5" onClick={toggleCart}>
          <Button
            link="/checkout"
            name="Check Out"
            styleClass="square color lighter mx-3"
          />
        </div>

        <h5 className="free-shipping text-center mt-auto">
          Free Shipping on All Orders Over $50!
        </h5>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartLength: selectCartLength,
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CartList);
