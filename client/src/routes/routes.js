import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import Home from '../pages/Home';
import Dashboard from '../pages/Books/Dashboard';
import Cart from '../pages/Cart';
import Logout from '../pages/Auth/logout';

import BookDetails from '../pages/BookDetails';
import AddBook from '../components/Book/addBook/addBook';

// Routes

export const routes = (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/logout' exact component={Logout} />
    <PrivateRoute path='/books/new' exact component={AddBook} />
    <Route path='/books/:bookID' component={BookDetails} />
    <PrivateRoute path='/books' component={Dashboard} />
    <Route path='/cart' component={Cart} />
    <Route path='*' render={() => <h1>Page Not Found</h1>} />
  </Switch>
);
