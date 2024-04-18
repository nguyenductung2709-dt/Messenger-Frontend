import axios from 'axios';
const baseUrl = '/api/users';

const getUserById = async(id) => {
    const getUrl = baseUrl + `/${id}`;
    const res = await axios.get(getUrl);
    return res.data;
}

export default {getUserById}