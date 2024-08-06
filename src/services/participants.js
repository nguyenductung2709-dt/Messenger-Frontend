import axios from 'axios';

const baseUrl = '/api/participants';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getParticipantById = async (conversationId) => {
  const getUrl = `${baseUrl}/${conversationId}`;
  const res = await axios.get(getUrl);
  return res.data;
};

const addParticipant = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
};

const deleteParticipant = async (id) => {
  const deleteUrl = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(deleteUrl, config);
  return response.data;
};

export default {
  setToken,
  getParticipantById,
  addParticipant,
  deleteParticipant,
};
