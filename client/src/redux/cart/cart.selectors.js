import { createSelector } from 'reselect';

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (state) => state.cartItems);

export const selectCartItemOrder = createSelector([selectCartItems], (cart) => cart);

export const selectCartLength = createSelector([selectCartItems], (cartItems) => {
  const quantityArr = cartItems.map((i) => i.order.quantity);
  return quantityArr.reduce((a, b) => a + b, 0);
});

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => {
  const totalArr = cartItems.map(
    (i) => (i.order.colorPrice * i.order.quantity * (100 - i.order.colorDiscount)) / 100,
  );
  return totalArr.reduce((a, b) => a + b, 0).toFixed(2);
});
