import { ReviewActionTypes } from './review.types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastSetting } from '../../utils/helper';

export const setProductReview = (reviews) => ({
  type: ReviewActionTypes.SET_PRODUCT_REVIEWS,
  payload: reviews,
});

export const deleteProductReview = (reviewId) => ({
  type: ReviewActionTypes.DELETE_PRODUCT_REVIEWS,
  payload: reviewId,
});

export const fetchProductReviews = (productId) => {
  return (dispatch) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/products/${productId}/reviews`)
      .then((res) => {
        dispatch(setProductReview(res.data.data));
      })
      .catch((e) => console.log(e));
};

export const createProductReviews = (productId, reviewForm, currentUser) => {
  console.log(currentUser);
  let newReview;
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}/reviews`,
      reviewForm,
    )
    .then((res) => {
      console.log(res.data);
      newReview = res.data.data;
      newReview.user = currentUser;
      toast('Thank you for your feedback!', toastSetting);
    });
  return {
    type: ReviewActionTypes.ADD_PRODUCT_REVIEWS,
    payload: newReview,
  };
};
