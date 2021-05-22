import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actionCreator from '../../store/_actions';
import Spinner from '../../components/UI/Spinner/Spinner';

import Button from '../../components/Form/Controls/Button/button';

const Books = (props) => {
  const [loading, setLoading] = useState(true);
  const { onGetBooks, onDeleteBook, books } = props;

  useEffect(() => {
    onGetBooks();
    setLoading(false);
  }, [onGetBooks]);

  const renderBooks = () => {
    return _.map(books, (book) => {
      const { _id: id, cover, title, description, price, creator } = book;
      if (book) {
        return (
          <div className='card' key={id}>
            <div className='image'>
              <img
                src={`http://localhost:8080/${cover}`}
                alt={title}
                title={title}
              />
            </div>
            <div className='content'>
              <h3 className='header'>{title}</h3>
              <p>{description}</p>
              <div className='meta'>
                <span>Price: </span>
                {price}
              </div>
            </div>
            <div className='extra content'>
              Created: <span>{creator.username}</span>
              <div className='extra content d-flex justify-content-between'>
                <Button
                  link={`/books/${id}?edit`}
                  type='button'
                  className='ui button teal'>
                  Edit
                </Button>
                <Button
                  onClick={() => onDeleteBook(id)}
                  className='ui button red'>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      }
      return "You don't have any books. ";
    });
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>Your Books</h1>
      <div className='ui link cards'>{renderBooks()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetBooks: () => dispatch(actionCreator.getBooks()),
    onDeleteBook: (id) => dispatch(actionCreator.deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
