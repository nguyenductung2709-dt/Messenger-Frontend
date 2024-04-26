import axios from "axios";
const baseUrl = "https://messenger-server.fly.dev/api/friends";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getFriendsById = async (id) => {
  const getUrl = baseUrl + `/${id}`;
  const response = await axios.get(getUrl);
  return response.data;
};

const addFriend = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
};

export default { setToken, addFriend, getFriendsById };
