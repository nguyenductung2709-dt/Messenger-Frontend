import axios from "axios";
const baseUrl = "/api/participants";

const getParticipantById = async (conversationId) => {
  const getUrl = baseUrl + `/${conversationId}`;
  const res = await axios.get(getUrl);
  return res.data;
};

export default { getParticipantById };
