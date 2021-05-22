import { NavLink } from 'react-router-dom';

import { useGlobalContext } from '../../../../_shared/context/app-context';

const UserNav = [
  // { id: 1, label: 'Login', link: '/' },
  { id: 2, label: 'Cart', link: '/cart' },
];
const AdminNav = [
  // { id: 1, label: 'Login', link: '/' },
  { id: 1, label: 'My Books', link: '/books' },
  { id: 2, label: 'Add Book', link: '/books/new' },
];
const NavItem = () => {
  const { isAuth, user } = useGlobalContext();
  const navArr = isAuth && user?.isAdmin ? AdminNav : isAuth ? UserNav : [];

  return navArr.map((item) => (
    <li className='nav-item col-6 col-md-auto' key={item.id}>
      <NavLink className='nav-link p-2' to={item.link} exact>
        <span>{item.label}</span>
      </NavLink>
    </li>
  ));
};

export default NavItem;
