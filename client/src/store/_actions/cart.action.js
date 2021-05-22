import * as actionTypes from './actionTypes';

export const addToCart = (bookID) => {
  return {
    type: actionTypes.ADD_BOOK,
    bookID,
  };
};
