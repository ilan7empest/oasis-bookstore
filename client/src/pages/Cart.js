import React from 'react';
import { connect } from 'react-redux';

import { useGlobalContext } from '../_shared/context/app-context';

import Spinner from '../components/UI/Spinner/Spinner';

const Cart = (props) => {
  const { items } = props.cart;
  const { books } = useGlobalContext();

  if (items.length < 1) {
    return <div>Your cart is empty</div>;
  }

  if (!items || !books) {
    return <Spinner />;
  }

  function renderCart() {
    const cart = items
      .reduce((result, cartItem) => {
        const book = books.find((book) => book.id === cartItem.id);
        const obj = {
          id: book.id,
          book: book.volumeInfo,
          amount: cartItem.amount,
        };
        result.push(obj);
        return result;
      }, [])
      .map(({ id, book, amount }) => {
        return (
          <div className='card' key={id}>
            <div class='image'>
              <img
                src={book.imageLinks?.thumbnail}
                alt={book.title}
                title={book.title}
              />
            </div>
            <div class='content'>
              <h3 className='header'>{book.title}</h3>
              <div className='meta'>
                by{' '}
                <span>{book.authors?.map((author) => author).join(', ')}</span>
              </div>
              <div>
                {book.publishedDate && (
                  <span className='publishedYear'>
                    First published in {book.publishedDate}
                  </span>
                )}
              </div>
            </div>
            <div className='extra content'>
              <span>Quantity: </span>
              {amount}
            </div>
          </div>
        );
      });

    return cart;
  }

  return (
    <div>
      <h3>You cart has {items.length} Items</h3>
      <div className='ui link cards'>{renderCart()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
