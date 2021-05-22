import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../store/_actions/';

import { Link } from 'react-router-dom';

import Button from '../Form/Controls/Button/button';

import classes from './BookItem.module.css';

import { useGlobalContext } from '../../_shared/context/app-context';

const BookItem = (props) => {
  const { isAuth, user, handleLogin } = useGlobalContext();
  const { id, volumeInfo: book } = props;
  const { thumbnail } = book.imageLinks || '';

  const btnCTA = () => {
    if (isAuth && user?.isAdmin) {
      return;
    }
    if (isAuth) {
      return (
        <Button
          onClick={() => props.handleAddToCart(id)}
          type='button'
          className='ui button teal'>
          PURCHASE
        </Button>
      );
    }
    return (
      <Button
        onClick={() => handleLogin()}
        type='button'
        className='ui button teal'>
        PURCHASE
      </Button>
    );
  };
  return (
    <li className={classes.bookItem}>
      <span className={classes.bookcover}>
        <Link to={`/books/${id}`}>
          <img
            src={thumbnail}
            alt={book.title}
            title={book.title}
            className='border'
          />
        </Link>
      </span>
      <div className={classes.details}>
        <h3 className='booktitle'>
          <Link
            to={`/books/${id}`}
            className='results text-decoration-none link-secondary'>
            {book.title}
          </Link>
        </h3>
        <div className='fs-5'>
          by <span>{book.authors?.map((author) => author).join(', ')}</span>
        </div>
        <div>
          {book.publishedDate && (
            <span className='publishedYear'>
              First published in {book.publishedDate}
            </span>
          )}
        </div>
      </div>
      <div className={classes.cta}>
        <Button link={`/books/${id}`} className='ui button primary mb-2'>
          View
        </Button>
        {btnCTA()}
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddToCart: (bookID) => dispatch(addToCart(bookID)),
  };
};

export default connect(null, mapDispatchToProps)(BookItem);
