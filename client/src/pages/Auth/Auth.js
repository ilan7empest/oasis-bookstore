import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Field, initialize } from 'redux-form';

import { AUTH_FILEDS } from './authFields';
import * as validator from '../../components/Form/redux-form-validation';
import ReduxForm from '../../components/Form/redux-form';
import { renderReduxField } from '../../components/Form/redux-form-field';

import { auth } from '../../store/_actions';

import Button from '../../components/Form/Controls/Button/button';
import Modal from '../../components/Modal/Modal';

import { useGlobalContext } from '../../_shared/context/app-context';

const Auth = (props) => {
  const { loginModal, setLoginModal, isAuth } = useGlobalContext();
  const [login, setLogin] = useState(false);
  const [form, setForm] = useState([]);
  const [show, setShow] = useState(false);

  const { OnInitialize, handleSubmitForm } = props;

  // Open Modal
  // const handleLogin = () => {
  //   setLogin(isLogin);
  //   setShow(true);
  // };

  useEffect(() => {
    if (loginModal) {
      setLogin(true);
      setShow(true);
    }
    return () => {
      setLogin(false);
      setShow(false);
    };
  }, [loginModal]);

  // Close Modal
  const closeModal = () => {
    setShow(false);
    setLoginModal(false);
  };

  // Handle Submit
  const handleSubmit = (values) => {
    return handleSubmitForm(login, values);
    // setShow(false);
    // setLoginModal(false);
    // return;
  };

  const renderButtons = (
    <div className='text-center'>
      <span>Switch to:</span>
      <Button
        className='ui button primary ms-3'
        onClick={() => setLogin(!login)}>
        {login ? 'Create account' : 'Log in'}
      </Button>
    </div>
  );

  const renderForm = form.map((field) => {
    return (
      <Field
        key={field.name}
        {...field}
        wrapper='mx-md-2'
        control={field.component}
        component={renderReduxField}
      />
    );
  });

  const FormFields = useCallback(() => {
    let fields = [];
    for (let Fieldname in AUTH_FILEDS) {
      if (login) {
        if (Fieldname === 'username') continue;
        if (Fieldname === 'isAdmin') continue;
        if (Fieldname === 'password') {
          AUTH_FILEDS[Fieldname].validate = [validator.required];
        }
      } else {
        if (Fieldname === 'password') {
          AUTH_FILEDS[Fieldname].validate = [
            validator.required,
            validator.password,
            validator.minLength(5),
          ];
        }
      }

      fields.push(AUTH_FILEDS[Fieldname]);
    }
    return fields;
  }, [login]);

  // Initialize Form with from fields
  const switchForms = useCallback(() => {
    if (show) {
      OnInitialize();
      setForm(FormFields());
    }
  }, [OnInitialize, FormFields, show]);

  useEffect(() => {
    switchForms();
  }, [switchForms]);

  return (
    <>
      {!isAuth && (
        <Modal
          title={`${login ? 'Login' : 'Sign Up'}  Form`}
          show={show}
          onClose={closeModal}>
          {renderButtons}
          <ReduxForm
            onFormSubmit={handleSubmit}
            form='auth'
            className='p-2 d-flex flex-column ui form'>
            {renderForm}
            <Button className='ui tiny button primary btn-md mx-md-2'>
              {login ? 'Login' : 'Register'}
            </Button>
          </ReduxForm>
        </Modal>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitForm: (login, values) => dispatch(auth(login, values)),
    OnInitialize: () => dispatch(initialize('auth', {})),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
