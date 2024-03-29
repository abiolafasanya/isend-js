import React, { useEffect, useState } from 'react';
import { FormControl, Select, TextField, MenuItem } from '@mui/material';
import styles from '../CreateOrder.module.css';
import { country, findAddrEnpoint, handleFetchLongLat } from '../helpers';
import Axios from '../../../api/axios';

const PickupDetails = ({ setOrderForm, sendersAddr, setSendersAddr ,setIsComputed}) => {
  const [hubs, setHub] = useState([]);
  const [hubAddress, setHubAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchHubs = async () => {
      const { data, status } = await Axios.get('/hubs');
      if (status === 200) {
        setHub(data.data.hubs);
      }
    };
    fetchHubs().then((data) => data);
  }, []);

  const handleFetchSenderAddress = (event) => {
    setIsComputed(false)
    const searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      const Endpoint = findAddrEnpoint(searchTerm);
      setTimeout(() => {
        fetch(Endpoint)
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data.data.results);
          })
          .catch((error) => console.error(error));
      }, 500);
    }
    setSendersAddr(event.target.value);
  };

  const onSuggestionHandler = async (text) => {
    setSuggestions([]);
    setSendersAddr(text);
    const geoData = await handleFetchLongLat(text);
    let result = geoData.result;
    setOrderForm((order) => ({
      ...order,
      senders_address: text,
      hub_location: {
        address: text,
        coordinates: [result?.lat, result?.lng],
      },
    }));
  };

  const setHubLocationAndAddress = (data) => {
    setHubAddress(() => data?.address);
    // console.log(data);
    // console.log(data.coordinates);
    setOrderForm((order) => ({
      ...order,
      hub_location: {
        address: data?.address,
        coordinates: data?.coordinates,
      },
    }));
  };

  return (
    <div>
      <label htmlFor="senders_name">Hub location</label>
      <FormControl fullWidth>
        <Select
          id="hub"
          defaultValue={''}
          value={hubAddress}
          onChange={({ target }) => {
            const selectedHub = hubs.find(
              (hub) => hub?.address === target.value
            );
            setHubLocationAndAddress(selectedHub ? { ...selectedHub } : null);
          }}
        >
          <MenuItem value="Select" disabled>
            Select One
          </MenuItem>
          {hubs?.map((hub) => (
            <MenuItem
              key={hub._id}
              value={hub?.address}
              style={{ textTransform: 'capitalize' }}
            >
              {hub?.address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <label htmlFor="senders_name">Senders Name</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="text"
        name="senders_name"
        id="senders_name"
        onChange={({ target }) =>
          setOrderForm((order) => ({
            ...order,
            senders_name: target.value,
          }))
        }
      />
      <label htmlFor="senders_address">Senders Address</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="search"
        value={sendersAddr}
        name="senders_address"
        id="senders_address"
        placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
        onChange={handleFetchSenderAddress}
        list="addrlist"
      />
      {suggestions && suggestions?.length > 0 && (
        <div id="addrlist" className={styles.addressList}>
          {suggestions?.map((address, i) => (
            <div
              className={styles.list}
              onClick={() => onSuggestionHandler(address.description)}
              key={Date.now() * i}
              value={address?.description}
            >
              {address?.description}
            </div>
          ))}
        </div>
      )}

      <label htmlFor="phone_number">Senders Phone Number</label>
      <div className={styles.form_group}>
        <TextField
          id="select_country"
          select
          variant="filled"
          defaultValue="NGN"
          className={styles.tel_list}
          onChange={({ target }) =>
            setOrderForm((order) => ({
              ...order,
              select_country: target.value,
            }))
          }
        >
          {country.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={styles.form_control_1}
          type="tel"
          name="phone_number"
          id="phone_number"
          placeholder="+234 810-019-4732"
          onChange={({ target }) =>
            setOrderForm((order) => ({
              ...order,
              senders_phonenumber: target.value,
            }))
          }
        />
      </div>
      <label htmlFor="sender_email">Senders Email</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="email"
        name="sender_email"
        id="sender_email"
        placeholder="youremail@domain.com"
        onChange={({ target }) =>
          setOrderForm((order) => ({
            ...order,
            senders_email: target.value,
          }))
        }
      />
    </div>
  );
};

export default PickupDetails;
