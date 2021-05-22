import axios from 'axios';

const options = {
  method: 'GET',
  baseURL: 'https://google-books.p.rapidapi.com',
  params: { key: 'AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc' },
  headers: {
    'x-rapidapi-key': '420b6d10c0msh0855dd7550e7ca9p1af768jsn3c33cdc38060',
    'x-rapidapi-host': 'google-books.p.rapidapi.com',
  },
};

const publickBooksAPI = axios.create(options);

export default publickBooksAPI;
