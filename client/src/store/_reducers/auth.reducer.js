import * as actionTypes from '../_actions/actionTypes';

const initialState = {
  user: null,
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: {
          username: action.user.username,
          userID: action.user.userID,
          isAdmin: action.user.isAdmin,
        },
        isAuth: true,
      };
    case actionTypes.POPULATE_USER:
      return {
        ...state,
        user: {
          username: action.user.username,
          userID: action.user.userID,
          isAdmin: action.user.isAdmin,
        },
        isAuth: true,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
