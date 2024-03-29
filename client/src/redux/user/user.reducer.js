import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  toggleLogout: false,
  currentUser: null,
  userReviews: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
