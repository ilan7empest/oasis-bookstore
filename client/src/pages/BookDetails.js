import React from 'react';
import { useParams } from 'react-router-dom';

import { useGlobalContext } from '../_shared/context/app-context';

import Spinner from '../components/UI/Spinner/Spinner';

const BookDetails = () => {
  const { getSingleBook, loading } = useGlobalContext();
  const { bookID } = useParams();

  let book;

  const markup = () => {
    return (
      <div className='row'>
        <div className='cover col-md-auto mb-4'>
          <img
            src={book.imageLinks.thumbnail}
            alt={book.title}
            title={book.title}
            className='border'
          />
          <p>{book.publishedDate}</p>
        </div>
        <div className='col-md-9'>
          <h4>{book.title}</h4>
          <div className='d-flex flex-row mb-3'>
            <div className='me-2'>
              {book.authors.map((author) => {
                return (
                  <span key={author} className='text-primary me-1'>
                    {author}
                  </span>
                );
              })}
              (Author),
            </div>
            <div>
              <span className='text-primary me-1'>{book.publisher}</span>
              (Publisher)
            </div>
          </div>
          <p>{book.description}</p>
        </div>
      </div>
    );
  };

  let renderBook;

  if (loading) {
    renderBook = <Spinner />;
  } else {
    const selectedBook = getSingleBook(bookID);
    console.log(selectedBook);

    if (!selectedBook) {
      renderBook = 'Book Not Found';
      return renderBook;
    }

    book = selectedBook.volumeInfo;
    renderBook = markup();
  }

  return <div className='book_details'>{renderBook}</div>;
};

export default BookDetails;
