import { createSelector } from 'reselect';

const selectState = (state) => state.category;

export const selectCategories = createSelector(
  selectState,
  (category) => category.categories,
);
