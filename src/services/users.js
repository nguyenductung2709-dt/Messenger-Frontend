import axios from "axios";
const baseUrl = "https://messenger-server.fly.dev/api/users";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getUserById = async (id) => {
  const getUrl = baseUrl + `/${id}`;
  const res = await axios.get(getUrl);
  return res.data;
};

const changeUserInformation = async(credentials, id) => {
  const putUrl = baseUrl + `/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(putUrl, credentials, config);
  return response.data;
}

export default { getUserById, changeUserInformation, setToken };
