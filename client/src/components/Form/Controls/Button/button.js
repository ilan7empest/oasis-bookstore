import React from 'react';

import { Link } from 'react-router-dom';

const button = (props) => {
  const { link, className, onClick, disabled, loading, children } = props;

  return link ? (
    <Link to={link} disabled={disabled} className={className}>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={onClick} disabled={disabled}>
      {loading ? (
        <span className='spinner-border spinner-border-sm mr-2'></span>
      ) : null}
      {children}
    </button>
  );
};

export default button;
