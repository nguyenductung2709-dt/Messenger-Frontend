import axios from 'axios';

const baseUrl = '/api/auth';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const login = async (credentials) => {
  const loginUrl = `${baseUrl}/login`;
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post('/api/users', credentials);
  return response.data;
};

const logout = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const logoutUrl = `${baseUrl}/logout`;
  const response = await axios.post(logoutUrl, null, config);
  return response.data;
};

export default {
  setToken,
  login,
  register,
  logout,
};
