import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './store/_actions';

import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './routes/routes';

import Layout from './components/UI/Layout/Layout';

import AppProvider from './_shared/context/app-context';

import './App.css';

const App = (props) => {
  const { checkAuthState } = props;

  const populateUser = useCallback(() => {
    checkAuthState();
  }, [checkAuthState]);

  useEffect(() => {
    populateUser();
  }, [populateUser]);

  return (
    <Router>
      <AppProvider>
        <Layout>{routes}</Layout>
      </AppProvider>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: () => dispatch(actionCreator.authCheckStatus()),
  };
};

export default connect(null, mapDispatchToProps)(App);
