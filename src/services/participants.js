import axios from "axios";
const baseUrl = "https://messenger-server-platform.fly.dev/api/participants";

const getParticipantById = async (conversationId) => {
  const getUrl = baseUrl + `/${conversationId}`;
  const res = await axios.get(getUrl);
  return res.data;
};

export default { getParticipantById };
