import * as actionTypes from './actionTypes';
import { setError } from './';
import history from '../../history';
import axiosInstance from '../../_shared/utils/http-handlers/http-auth-token';
import LocalStorageService from '../../_shared/utils/LocalStorageService';

const localStorageService = LocalStorageService.getService();
// Auth
const authSuccess = ({ user }) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user,
  };
};

export const auth = (login, userForm) => {
  const tokenExpiration = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 7
  );
  const authPath = login ? 'login' : 'signup';
  return async (dispatch) => {
    let response;
    try {
      response = await axiosInstance.post(`/users/${authPath}`, userForm);
    } catch (err) {
      dispatch(setError(err.data.message));
    }
    if (response) {
      const { username, userID, isAdmin, refresh_token } = response.data;
      dispatch(
        authSuccess({
          user: {
            username,
            userID,
            isAdmin,
          },
        })
      );
      localStorageService.setAuthLocalStorage(
        {
          username,
          userID,
          isAdmin,
        },
        refresh_token,
        tokenExpiration
      );
      history.push('/books');
    }

    return;
  };
};

//Logout
export const logout = () => {
  localStorageService.setInitAuthLocalStorage();
  axiosInstance.get('/users/logout');
  return { type: actionTypes.LOGOUT };
};

//Populate User
const populateUser = ({ user }) => {
  return {
    type: actionTypes.POPULATE_USER,
    user,
  };
};

//Populate User
export const authCheckStatus = () => {
  const { user, refresh_token, token_expireIn } =
    localStorageService.getAuthLocalStorage([
      'user',
      'refresh_token',
      'token_expireIn',
    ]);
  return (dispatch) => {
    if (
      user &&
      refresh_token &&
      token_expireIn &&
      new Date(token_expireIn) > new Date()
    ) {
      dispatch(
        populateUser({
          user: {
            username: user?.username,
            userID: user?.userID,
            isAdmin: user?.isAdmin,
          },
        })
      );
    } else if (token_expireIn && new Date(token_expireIn) < new Date()) {
      dispatch(logout());
    } else {
      localStorageService.setInitAuthLocalStorage();
    }
  };
  // return async (dispatch) => {
  //   const expiresIn = new Date(localStorage.getItem('token_expireIn'));
  //   const user = await JSON.parse(localStorage.getItem('user'));
  //   const currentTime = new Date(new Date());
  //   if (
  //     _.isEmpty(user) ||
  //     !user.hasOwnProperty('refreshToken') ||
  //     currentTime - new Date(expiresIn) > 1000 * 60 * 30
  //   ) {
  //     dispatch(logout());
  //     return;
  //   }
  //   dispatch(populateUser(user));
  // };
};
