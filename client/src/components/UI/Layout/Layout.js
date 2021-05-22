import React from 'react';
import Header from '../Navigation/Header/Header';

const layout = ({ children, isAuth }) => {
  return (
    <div className='d-flex flex-column justify-space-between h-100'>
      <Header isAuth={isAuth} />
      {/* <Navbar isAuth={isAuth} />
        <MainNavigation isAuth={isAuth} /> */}
      <main className='container mt-3 flex-grow-1'>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default layout;
