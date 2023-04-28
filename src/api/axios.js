import axios from 'axios';

const Axios = axios.create({
  baseURL: "https://isend-api-v1.herokuapp.com/api/v1/",
});

// Axios.defaults.headers.common[
//   'Authorization'
// ] = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export default Axios;
