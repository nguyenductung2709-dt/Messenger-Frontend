import axios from 'axios';

const baseUrl = '/api/conversations';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getConversations = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getConversationById = async (id) => {
  const getUrl = `${baseUrl}/${id}`;
  const res = await axios.get(getUrl);
  return res.data;
};

const createConversation = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
};

const changeConversationInformation = async (id, credentials) => {
  const putUrl = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(putUrl, credentials, config);
  return response.data;
};

export default {
  setToken,
  getConversations,
  getConversationById,
  createConversation,
  changeConversationInformation,
};
