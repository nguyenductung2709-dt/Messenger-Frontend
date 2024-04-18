import axios from 'axios'
const baseUrl = "/api/conversations"

const getConversations = async() => {
    const res = await axios.get(baseUrl);
    return res.data
}

const getConversationById = async(id) => {
    const getUrl = baseUrl + `/${id}`;
    const res = await axios.get(getUrl);
    return res.data;
}

export default {getConversations, getConversationById}