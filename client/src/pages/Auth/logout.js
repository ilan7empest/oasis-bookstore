import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/_actions/';

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  });

  return <Redirect to='/' />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreator.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
