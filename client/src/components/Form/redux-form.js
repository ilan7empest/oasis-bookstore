import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

const ReduxForm = ({ handleSubmit, className, children, onFormSubmit }) => {
  const onSubmit = (formValues) => onFormSubmit(formValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {children}
    </form>
  );
};

ReduxForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const Form = reduxForm()(ReduxForm);

export default Form;
