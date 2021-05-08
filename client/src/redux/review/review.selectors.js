import { createSelector } from 'reselect';

const selectState = (state) => state.review;

export const selectReviews = createSelector(selectState, (review) => review.reviews);
