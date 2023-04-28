import Axios from '../../api/axios';

const progressUpdateHandler = async (body) => {
  const { data } = await Axios.patch('/admin/orders', body);
  if (data.error) return;
  return data;
};

const getAllRiders = async () => {
  const { data } = await Axios.get('/v1/riders/');
  if (data.error) return;
  return data.data.riders;
};

const assignRider = async (body) => {
  const { data } = await Axios.patch('/admin/assignee', body);
  if (data.error) return;
  return data;
};

const getOrderProgress = async () => {
  const { data } = await Axios.get('/order_progress/');
  if (data.error) return;
  return data;
};

const getOrderProgressId = async (id) => {
  const { data } = await Axios.get('order_progress/'+id);
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
