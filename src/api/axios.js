import axios from 'axios';

const Axios = axios.create({
  baseURL: "https://isend-v1.herokuapp.com/api/v1/",
});

const token = JSON.parse(localStorage.getItem('auth'))?.token;

Axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${token}`;

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
