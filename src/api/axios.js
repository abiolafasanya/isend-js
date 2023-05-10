import axios from 'axios';
import Cookies from 'js-cookie';

let API_URI;
const apiURL = 'https://isend-api-v1.onrender.com/api/v1/';
if (process.env.NODE_ENV === 'production') {
  API_URI = process.env.REACT_APP_ISEND_API_URL;
} else {
  API_URI = apiURL;
}

const Axios = axios.create({
  baseURL: API_URI,
});

const rawToken = Cookies.get('auth');
const token = rawToken ? JSON.parse(rawToken).token : '';
if (token) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
