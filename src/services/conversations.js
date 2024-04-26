import axios from "axios";
const baseUrl = "https://messenger-server.fly.dev/api/conversations";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getConversations = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getConversationById = async (id) => {
  const getUrl = baseUrl + `/${id}`;
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

export default {
  setToken,
  getConversations,
  getConversationById,
  createConversation,
};
