import * as actionTypes from '../_actions/actionTypes';
const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK: {
      const existingBook = state.items.find(
        (item) => item.id === action.bookID
      );
      if (existingBook) {
        existingBook.amount += 1;
        return { ...state };
      } else {
        let book = {
          id: action.bookID,
          amount: 1,
        };
        return {
          ...state,
          items: [...state.items, book],
        };
      }
    }

    default:
      return state;
  }
};

export default reducer;
