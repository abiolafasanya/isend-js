import Axios from '../../api/axios';

const progressUpdateHandler = async (body) => {
  let url = 'https://isend-v1.herokuapp.com/api/v1/admin/orders';
  const { data } = await Axios.patch(url, body);
  if (data.error) return;
  return data;
};

const getAllRiders = async () => {
  let url = 'https://isend-v1.herokuapp.com/api/v1/riders/';
  const { data } = await Axios.get(url);
  if (data.error) return;
  // console.log(data.data.riders)
  return data.data.riders;
};

const assignRider = async (body) => {
  let url = 'https://isend-v1.herokuapp.com/api/v1/admin/assignee';
  const { data } = await Axios.patch(url, body);
  if (data.error) return;
  return data;
};

const getOrderProgress = async () => {
  let url = 'https://isend-v1.herokuapp.com/api/v1/order_progress/';
  const { data } = await Axios.get(url);
  if (data.error) return;
  return data;
};

const getOrderProgressId = async (id) => {
  let url = 'https://isend-v1.herokuapp.com/api/v1/order_progress/'+id;
  const { data } = await Axios.get(url);
  if (data.error) return;
  return data;
};

export {
  progressUpdateHandler,
  getAllRiders,
  getOrderProgress,
  assignRider,
  getOrderProgressId
};
