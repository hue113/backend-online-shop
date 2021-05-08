import { ReviewActionTypes } from './review.types';

const INITIAL_STATE = {
  reviews: [],
};

const reviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReviewActionTypes.SET_PRODUCT_REVIEWS:
      return {
        reviews: action.payload,
      };
    case ReviewActionTypes.ADD_PRODUCT_REVIEWS:
      return {
        reviews: [...state.reviews, action.payload],
      };
    case ReviewActionTypes.DELETE_PRODUCT_REVIEWS:
      console.log(action.type);
      const copyReview = [...state.reviews];
      const updatedReviews = copyReview.filter((review) => review.id !== action.payload);
      console.log(updatedReviews);
      return {
        reviews: updatedReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
