import axios from "axios";
const baseUrl = "https://messenger-server-platform.fly.dev/api/participants";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getParticipantById = async (conversationId) => {
  const getUrl = baseUrl + `/${conversationId}`;
  const res = await axios.get(getUrl);
  return res.data;
};

const addParticipant = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
}

export default { setToken, getParticipantById, addParticipant };
