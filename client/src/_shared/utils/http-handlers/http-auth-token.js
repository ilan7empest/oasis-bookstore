import axiosInstance from './api.instance';
import axios from 'axios';
import { authHeader } from './auth-header';
import LocalStorageService from '../LocalStorageService';
// import history from '../history';

const localStorageService = LocalStorageService.getService();
axiosInstance.interceptors.request.use(
  (request) => {
    let user = localStorageService.getUser();
    if (user) {
      request.headers = authHeader();
      request.withCredentials = true;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    let { user, refresh_token } = localStorageService.getAuthLocalStorage([
      'user',
      'refresh_token',
    ]);
    if (
      user &&
      refresh_token &&
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const { username, userID } = user;
      if (
        error.response.statusText === 'Unauthorized' &&
        error.response.data === 'Unauthorized'
      ) {
        let response;
        try {
          response = await axios.get('/api/users/token', {
            headers: {
              username,
              refresh_token,
              userID,
            },
          });
        } catch (err) {
          if (error.response.status === 401 && !err.response.data.token) {
            localStorageService.setInitAuthLocalStorage();
            return Promise.reject(error.response);
          }
        }

        if (response.status === 201) {
          // 1) put refresh token to LocalStorage
          localStorageService.setNewRefreshToken(response.data);

          // 2) return originalRequest object with Axios.
          return axiosInstance(originalRequest);
        }
      }
    }
    console.log(error.response);
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
