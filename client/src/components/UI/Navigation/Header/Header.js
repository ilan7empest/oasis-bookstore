import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import MobileToggle from '../MobileToggler/MobileToggler';
import NavItems from '../NavItem/NavItem';

import Search from '../../../Search/Search';
import Button from '../../../Form/Controls/Button/button';
import Auth from '../../../../pages/Auth/Auth';

import { useGlobalContext } from '../../../../_shared/context/app-context';

import classes from './Header.module.css';

const Header = () => {
  const { isAuth, handleLogin } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`navbar navbar-expand-md navbar-dark ${classes.header}`}>
      <nav className='container-xxl flex-wrap flex-md-nowrap align-items-baseline'>
        <NavLink className='navbar-brand ml-3' to='/'>
          OasisBookStore
        </NavLink>
        <MobileToggle toggleMenu={toggleMenu} />
        <div className={`navbar-collapse collapse ${isOpen && 'show'}`}>
          <ul className='navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0'>
            <NavItems />
          </ul>
          <hr className='d-md-none text-white-50' />
          <div className='ms-md-auto'>
            <Search />
          </div>
          <div className='navbar-nav ms-3'>
            {!isAuth ? (
              <>
                <Button className='ui button primary' onClick={handleLogin}>
                  Auth
                </Button>
              </>
            ) : (
              <NavLink to='/logout' className='nav-link'>
                Logout
              </NavLink>
            )}
          </div>
          <Auth />
        </div>
      </nav>
    </header>
  );
};
export default Header;
