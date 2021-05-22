import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import ErrorReducer from './error.reducer';
import BooksReducer from './books.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  books: BooksReducer,
  cart: cartReducer,
  error: ErrorReducer,
  form: formReducer,
});

export default rootReducer;
