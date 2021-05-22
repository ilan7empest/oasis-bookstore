import * as actionTypes from './actionTypes';
import axiosInstance from '../../_shared/utils/http-handlers/api.instance';

const getBooksSuccess = (payload) => {
  return {
    type: actionTypes.GET_BOOKS_SUCCESS,
    books: payload,
  };
};

export const getBooks = () => {
  return (dispatch) => {
    // dispatch(getBooksRequest());
    axiosInstance
      .get('/books')
      .then((res) => {
        dispatch(getBooksSuccess(res.data.docs));
      })
      .catch((err) => {
        console.log(err);
        // dispatch(getBooksFail(err));
      });
  };
};

export const clearBooks = () => {
  return {
    type: actionTypes.CLEAR_BOOKS,
  };
};
