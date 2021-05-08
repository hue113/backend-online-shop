import { createSelector } from 'reselect';

const selectToggle = (state) => state.toggle;

export const selectLogOutHidden = createSelector(
  [selectToggle],
  (toggle) => toggle.logOutHidden,
);

export const selectFavouriteHidden = createSelector(
  [selectToggle],
  (toggle) => toggle.favouriteHidden,
);

export const selectCartHidden = createSelector(
  [selectToggle],
  (toggle) => toggle.cartHidden,
);

export const selectProductModalHidden = createSelector(
  [selectToggle],
  (toggle) => toggle.productModalHidden,
);

export const selectSearchHidden = createSelector(
  [selectToggle],
  (toggle) => toggle.searchHidden,
);
