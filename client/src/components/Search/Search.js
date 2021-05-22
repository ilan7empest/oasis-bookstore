import React from 'react';
import { useGlobalContext } from '../../_shared/context/app-context';

const Search = () => {
  const booksApi = useGlobalContext();
  const handleChange = (e) => {
    booksApi.setSearchTerm(e.target.value);
  };
  return (
    <div className='ui category search'>
      <div className='ui icon input w-100'>
        <input
          className='prompt py-2'
          type='text'
          name='searchBook'
          placeholder='Search book...'
          onChange={handleChange}
          value={booksApi.searchTerm}
        />
        <i className='search icon'></i>
      </div>
    </div>
  );
};

export default Search;
