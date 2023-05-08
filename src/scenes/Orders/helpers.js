import Axios from '../../api/axios';
import axios from 'axios'

const handleFetchLongLat = async (address) => {
  let Endpoint;
  if (process.env.NODE_ENV !== 'production') {
    Endpoint = `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/geocoding?address=${address}`;
  } else {
    Endpoint = `${process.env.REACT_APP_GOOGLE_GEOCODING}=${address}`;
  }
  const {data} = await axios.get(Endpoint);
  return data.data;
  // return await fetch(Endpoint)
  //   .then((res) => res.json())
  //   .then((data) => data)
  //   .catch((error) => console.error(error));
};

const defaultFormValue = {
  senders_address: '',
  receivers_address: '',
  senders_phonenumber: '',
  senders_email: '',
  category: '',
  receivers_name: '',
  receivers_phonenumber: '',
  item_value: 0,
  delivery_note: '',
  hub_location: {
    address: '',
    coordinates: [],
  },
  delivery_details: {
    coordinates: [],
    address: '',
  },
};

const priceProps = {
  distance: 0,
  delivery_fare: 0,
  base_fee: 0,
  total: 0,
};

const country = [
  {
    value: 'NGN',
    label: '+234',
  },
  {
    value: 'GHN',
    label: '+233',
  },
  {
    value: 'USA',
    label: '+1',
  },
];

const categories = ['electronics', 'food', 'documents'];

function findAddrEnpoint(searchTerm) {
  let Endpoint;
  if (process.env.NODE_ENV !== 'production') {
    Endpoint = `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/place-autocomplete?address=${searchTerm}`;
    //  `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/place-autocomplete?address=${searchTerm}`
    return Endpoint;
  } else {
    Endpoint = `${process.env.REACT_APP_AUTOCOMPLETE_ADDRESS}=${searchTerm}`;
    return Endpoint;
  }
}

async function getPayableAmount({ deliveryCordinate, hubLocationCordinate }) {
  const body = {
    delivery_details: {
      coordinates: deliveryCordinate,
    },
    hub_location: {
      coordinates: hubLocationCordinate,
    },
  };

  try {
    const { data, status } = await Axios.post('/admin/compute', body);
    if (status === 200 || status === 201) {
      return data;
    }
  } catch (error) {
    console.log(error, 'something went wrong');
  }
}

const computeTotal = async ({address, priceInfo, setTotal, orderForm}) => {
  const geoData = await handleFetchLongLat(address);
  // return console.log(address, await geoData);
  let result = geoData?.result;
  const getPayment = {
    delivery: [result?.lat, result?.lng],
    hub: orderForm?.hub_location.coordinates,
  };
  const paymentResult = await getPayableAmount({
    deliveryCordinate: getPayment.delivery,
    hubLocationCordinate: getPayment.hub,
  });

  priceInfo(paymentResult);
  setTotal(paymentResult.total);

  return true
}

export {
  handleFetchLongLat,
  defaultFormValue,
  country,
  categories,
  findAddrEnpoint,
  getPayableAmount,
  priceProps,
  computeTotal,
};

// const url = 'https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/geocoding?address=vgc'
