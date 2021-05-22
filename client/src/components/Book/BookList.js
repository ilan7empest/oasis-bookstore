import React from 'react';

import { useGlobalContext } from '../../_shared/context/app-context';
import BookItem from './BookItem';
import Spinner from '../UI/Spinner/Spinner';

const BookList = () => {
  const { books, searchTerm, loading } = useGlobalContext();

  let renderBooks;

  if (loading || !books) {
    renderBooks = <Spinner />;
  } else {
    renderBooks = books
      .filter((book) => {
        const bookTitle = book.volumeInfo.title.toLowerCase();
        return bookTitle.indexOf(searchTerm.toLowerCase()) !== -1;
      })
      .map((book) => {
        return <BookItem key={book.id} {...book} />;
      });
  }

  return (
    <>
      <ul className='p-0'>{renderBooks}</ul>
    </>
  );
};

export default BookList;
