const handleFetchLongLat = (address) => {
    let Endpoint;
    if (process.env.NODE_ENV !== 'production') {
      Endpoint = `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/geocoding?address=${address}`;
    } else {
      Endpoint = `${process.env.REACT_APP_GOOGLE_GEOCODING}=${address}`;
    }
    return fetch(Endpoint)
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error(error));
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
      return Endpoint
    } else {
      Endpoint = `${process.env.REACT_APP_AUTOCOMPLETE_ADDRESS}=${searchTerm}`;
      return Endpoint
    }
    
 }

export {
    handleFetchLongLat,
    defaultFormValue,
    country,
    categories,
    findAddrEnpoint
}



  // const url = 'https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/geocoding?address=vgc'
