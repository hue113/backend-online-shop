import axios from 'axios';
import { UserActionTypes } from './user.types';
import { toast } from 'react-toastify';
import { toastSetting } from '../../utils/helper';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setUserReviews = (reviews) => ({
  type: UserActionTypes.SET_USER_REVIEWS,
  payload: reviews,
});

export const getCurrentUser = () => {
  return (dispatch) => {
    const jwt = document.cookie.split('=')[1];
    if (jwt) {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/users/me`, {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .then((res) => {
          dispatch(setCurrentUser(res.data.data));
        })
        .catch((e) => console.log(e));
    }
  };
};

export const updateUserInfo = (user) => {
  return (dispatch) => {
    const jwt = document.cookie.split('=')[1];
    if (jwt) {
      return axios
        .patch(`${process.env.REACT_APP_API_URL}/api/v1/users/updateMe`, user, {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .then((res) => {
          const user = res.data.data.user;
          dispatch(setCurrentUser(user));
          toast('Account was updated successfully!');
        })
        .catch((e) => {
          console.log(e);
          toast.error('Error happened! Please try again');
        });
    }
  };
};

export const updateUserPassword = (passwords) => {
  return (dispatch) => {
    const jwt = document.cookie.split('=')[1];
    if (jwt) {
      return axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/v1/users/updatePassword`,
          passwords,
          {
            headers: {
              Authorization: 'Bearer ' + jwt,
            },
          },
        )
        .then((res) => {
          document.cookie += '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          document.cookie = `jwt=${res.data.token}`;
          const user = res.data.user;
          dispatch(setCurrentUser(user));
          toast('Password was changed successfully!');
          // }
        })
        .catch((e) => {
          toast.error(`Current password is wrong! Please try again!`);
        });
    }
  };
};

export const getUserReviews = () => {
  return (dispatch) => {
    const jwt = document.cookie.split('=')[1];
    if (jwt) {
      return axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/users/my-reviews`, {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .then((res) => {
          dispatch(setUserReviews(res.data.data));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
};

export const updateUserReview = (reviewId, updateReview) => {
  return (dispatch) => {
    const jwt = document.cookie.split('=')[1];
    if (jwt) {
      return axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/v1/users/my-reviews/${reviewId}`,
          updateReview,
          {
            headers: {
              Authorization: 'Bearer ' + jwt,
            },
          },
        )
        .then(() => toast('Your review was updated successfully!', toastSetting))
        .catch((e) => {
          window.location.reload();
        });
    }
  };
};

export const deleteUserReview = (reviewId, reviews) => {
  return (dispatch) => {
    const jwt = document.cookie.split('=')[1];
    if (jwt) {
      return axios
        .delete(`${process.env.REACT_APP_API_URL}/api/v1/users/my-reviews/${reviewId}`, {
          headers: {
            Authorization: 'Bearer ' + jwt,
          },
        })
        .then((res) => {
          if (reviews) {
            const updatedUserReviews = reviews.filter((el) => el.id !== res.data.data.id);
            dispatch(setUserReviews(updatedUserReviews));
          }
          toast('Your review was deleted successfully!', toastSetting);
        });
      // .catch((e) => window.location.reload());
    }
  };
};
