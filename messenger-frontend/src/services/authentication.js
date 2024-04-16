import axios from "axios";
const baseUrl = "/api/auth";

const login = async (credentials) => {
  const loginUrl = baseUrl + "/login";
  const response = await axios.post(loginUrl, credentials);
  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post("/api/users", credentials);
  return response.data;
};

export default { login, register };
