import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import ReduxForm from '../../Form/redux-form';
import { renderReduxField } from '../../Form/redux-form-field';

import { createBook } from '../../../store/_actions';

import Button from '../../Form/Controls/Button/button';

import { BOOK_FIELDS } from './form-fields';

const AddBook = (props) => {
  const createForm = BOOK_FIELDS.map((field) => {
    return (
      <Field
        key={field.name}
        {...field}
        wrapper=''
        control={field.control}
        component={renderReduxField}
      />
    );
  });
  const handleSubmit = (book) => {
    const formData = new FormData();
    for (let key in book) {
      formData.append(key, book[key]);
    }
    props.createBook(formData, () => {
      props.history.push('/books');
    });
  };
  return (
    <>
      <ReduxForm
        onFormSubmit={handleSubmit}
        form='createBook'
        className='ui form'>
        {createForm}
        <Button className='ui tiny button primary btn-md mx-md-2'>
          SUBMIT
        </Button>
      </ReduxForm>
    </>
  );
};

export default connect(null, { createBook })(AddBook);
