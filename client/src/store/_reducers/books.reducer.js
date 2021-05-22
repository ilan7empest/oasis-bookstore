import _ from 'lodash';
import * as actionTypes from '../_actions/actionTypes';
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOOKS_SUCCESS: {
      const books = _.mapKeys(action.books, '_id');
      return { ...state, ...books };
    }
    case actionTypes.GET_BOOK: {
      return { ...state, [action.payload._id]: action.payload };
    }
    case actionTypes.CREATE_BOOK: {
      return { ...state, [action.payload._id]: action.payload };
    }
    case actionTypes.UPDATE_BOOK: {
      return { ...state, [action.payload._id]: action.payload };
    }
    case actionTypes.DELETE_BOOK: {
      return _.omit(state, action.id);
    }
    case actionTypes.CLEAR_BOOKS: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
