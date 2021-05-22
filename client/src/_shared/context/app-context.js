import React, { createContext, useContext, useState } from 'react';
import { connect } from 'react-redux';

import publicBooksAPI from '../utils/public-books-api';
import { useHTTP } from '../hooks/useHTTP';

const AppContext = createContext();

const AppProvider = ({ children, ...props }) => {
  const { user, isAuth } = props;
  const [books, bookError, loading] = useHTTP(publicBooksAPI, '/volumes');
  const [searchTerm, setSearchTerm] = useState('');

  const [loginModal, setLoginModal] = useState(false);

  const getSingleBook = (bookID) => {
    return books.find((book) => book.id === bookID);
  };

  const handleLogin = () => {
    setLoginModal(true);
  };

  return (
    <AppContext.Provider
      value={{
        books,
        bookError,
        loading,
        searchTerm,
        user,
        isAuth,
        loginModal,
        setLoginModal,
        setSearchTerm,
        getSingleBook,
        handleLogin,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    serverErrors: state.error,
  };
};

export default connect(mapStateToProps, null)(AppProvider);
