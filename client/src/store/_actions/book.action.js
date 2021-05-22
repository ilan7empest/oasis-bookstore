import * as actionTypes from './actionTypes';
import axiosInstance from '../../_shared/utils/http-handlers/api.instance';

export const createBook = (book, cb) => async (dispatch) => {
  let response;
  try {
    response = await axiosInstance.post('/books', book);
  } catch (err) {}
  if (response) {
    cb();
    dispatch({
      type: actionTypes.CREATE_BOOK,
      payload: response.data.book,
    });
  }
};

export const getBook = (id) => (dispatch) => {
  axiosInstance.get(`/books/${id}`).then((res) => {
    dispatch({
      type: actionTypes.GET_BOOK,
      payload: res.data.book,
    });
  });
};

export const updateBook = (id) => (dispatch) => {
  axiosInstance.patch(`/books/${id}`).then((res) => {
    dispatch({
      type: actionTypes.UPDATE_BOOK,
      payload: res.data.book,
    });
  });
};

export const deleteBook = (id) => (dispatch) => {
  axiosInstance.delete(`/books/${id}`).then((res) => {
    dispatch({
      type: actionTypes.DELETE_BOOK,
      id,
    });
  });
};
