import Axios from '../../api/axios';


const progressUpdateHandler = async (body) => {
  let url = '/admin/orders';
  const { data } = await Axios.patch(url, body);
  if (data.error) return;
  return data;
};

const getAllRiders = async () => {
  let url = '/riders/';
  const { data } = await Axios.get(url);
  if (data.error) return;
  // console.log(data.data.riders)
  return data.data.riders;
};

const assignRider = async (body) => {
  let url = '/admin/assignee';
  const { data } = await Axios.patch(url, body);
  if (data.error) return;
  return data;
};

const getOrderProgress = async () => {
  let url = '/order_progress/';
  const { data } = await Axios.get(url);
  if (data.error) return;
  return data;
};

const getOrderProgressId = async (id) => {
  let url = '/order_progress/'+id;
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
