import * as actionTypes from './actionTypes';

export const setError = (err) => {
  return {
    type: actionTypes.GET_SERVER_ERRORS,
    payload: err || '',
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_SERVER_ERRORS,
  };
};
