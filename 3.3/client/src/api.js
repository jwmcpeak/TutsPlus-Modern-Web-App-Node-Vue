import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;

function buildUrl(path) {
    return `${apiUrl}${path}`;
}

module.exports = {
    authenticate(credentials) {
        let url = buildUrl('login');

        return axios.post(url, credentials).then(res => res.data);
    }
}