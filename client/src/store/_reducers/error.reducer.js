import * as actionTypes from '../_actions/actionTypes';

const initialState = '';

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SERVER_ERRORS:
      return action.payload;
    case actionTypes.CLEAR_SERVER_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export default ErrorReducer;
