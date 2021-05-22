const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  const _setInitAuthLocalStorage = () => {
    localStorage.setItem('user', null);
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('token_expireIn', '');
  };

  const _setAuthLocalStorage = (...keys) => {
    const [user, refresh_token, token_expireIn] = keys;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
    localStorage.setItem('token_expireIn', JSON.stringify(token_expireIn));
  };

  const _getAuthLocalStorage = (keys) => {
    let values = {};
    for (let key of keys) {
      let value = localStorage.getItem(key);
      if (value) {
        values[key] = JSON.parse(localStorage.getItem(key));
      }
    }
    return values;
  };

  const _setUser = async ({ refresh_token, username, userID }) => {
    const tokenExperationTime = new Date(
      new Date().getTime() + 1000 * 60 * 30
    ).toISOString();

    localStorage.setItem('user', JSON.stringify({ username, userID }));
    localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
    localStorage.setItem('token_expireIn', JSON.stringify(tokenExperationTime));
  };
  const _getUser = () => {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  };

  const _setNewRefreshToken = ({ refresh_token }) => {
    const tokenExperationTime = new Date(
      new Date().getTime() + 1000 * 60 * 30
    ).toISOString();

    localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
    localStorage.setItem('token_expireIn', JSON.stringify(tokenExperationTime));
  };

  const _getRefreshToken = () => {
    const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
    const token_expireIn = JSON.parse(localStorage.getItem('token_expireIn'));
    return [refresh_token, token_expireIn];
  };

  const _clearToken = () => {
    localStorage.clear();
  };

  return {
    getService: _getService,
    setInitAuthLocalStorage: _setInitAuthLocalStorage,
    setAuthLocalStorage: _setAuthLocalStorage,
    getAuthLocalStorage: _getAuthLocalStorage,
    setUser: _setUser,
    getUser: _getUser,
    setNewRefreshToken: _setNewRefreshToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
