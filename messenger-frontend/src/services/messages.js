import axios from 'axios';
const baseUrl = "/api/messages";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`; 
}

const sendMessage = async(credentials) => {
    const config = {
        headers: { Authorization: token },
      };
    const response = await axios.post(baseUrl, credentials, config); 
    return response.data;
}

const getMessagesFromConversation = async(conversationId) => {
    const getUrl = baseUrl + `/${conversationId}`;
    const response = await axios.get(getUrl);
    return response.data;
}

export default { setToken, sendMessage, getMessagesFromConversation };