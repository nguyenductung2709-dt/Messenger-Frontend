import axios from 'axios';

const baseUrl = '/api/users';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getUserById = async (id) => {
  const getUrl = `${baseUrl}/${id}`;
  const res = await axios.get(getUrl);
  return res.data;
};

const requestEmailVerification = async (id) => {
  const postUrl = `${baseUrl}/resend-verification-email/${id}`;
  const res = await axios.post(postUrl);
  return res.data;
}

const changeUserInformation = async (credentials, id) => {
  const putUrl = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(putUrl, credentials, config);
  return response.data;
};

export default { getUserById, changeUserInformation, setToken, requestEmailVerification };
