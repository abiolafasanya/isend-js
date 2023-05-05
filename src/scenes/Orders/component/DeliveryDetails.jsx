import React from 'react';
import { FormControl, Select, TextField, MenuItem } from '@mui/material';
import styles from '../CreateOrder.module.css';
import {
  country,
  findAddrEnpoint,
  getPayableAmount,
  handleFetchLongLat,
  categories,
} from '../helpers';

const DeliveryDetails = ({
  setOrderForm,
  suggestions,
  setSuggestions,
  setRecieversAddr,
  receiversAddr,
  setTotal,
  orderForm,
}) => {
  const handleFetchRecieverAddress = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      console.log(searchTerm);
      const Endpoint = findAddrEnpoint(searchTerm);
      setTimeout(() => {
        fetch(Endpoint)
          .then((res) => res.json())
          .then((data) => {
            setSuggestions(data.data.results);
            console.log(data.data.results);
          })
          .catch((error) => console.error(error));
      }, 1000);
    }
    setRecieversAddr(event.target.value);
  };

  const onSuggestionReceiverHandler = async (text) => {
    setRecieversAddr(text);
    const geoData = await handleFetchLongLat(text);
    console.log(geoData.data.result);
    let result = geoData.data.result;
    setOrderForm((order) => ({
      ...order,
      receivers_address: text,
      delivery_details: {
        address: text,
        coordinates: [result?.lat, result?.lng],
      },
    }));
    const getPayment = {
      delivery: [result?.lat, result?.lng],
      hub: orderForm.hub_location.coordinates,
    };
    const paymentResult = await getPayableAmount({
      deliveryCordinate: getPayment.delivery,
      hubLocationCordinate: getPayment.hub,
    });

    console.log(paymentResult);

    setSuggestions([]);
  };

  return (
    <div>
      <h3>Receiver's Details</h3>
      <label htmlFor="recievers_name">Receiver's Name</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="text"
        name="recievers_name"
        id="recievers_name"
        onChange={({ target }) =>
          setOrderForm((order) => ({
            ...order,
            recievers_name: target.value,
          }))
        }
      />
      <label htmlFor="recievers_address">Receiver's Address</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="text"
        value={receiversAddr}
        name="recievers_address"
        id="recievers_address"
        placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
        onChange={handleFetchRecieverAddress}
      />
      {suggestions && suggestions.length > 0 && (
        <div id="addrlist" className={styles.addressList}>
          {suggestions?.map((address, i) => (
            <div
              className={styles.list}
              onClick={() => onSuggestionReceiverHandler(address.description)}
              key={Date.now() * i}
              value={address?.description}
            >
              {address?.description}
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor="recievers_phone_number"
        style={{ marginTop: '1rem', display: 'block' }}
      >
        Receiver's Phone Number
      </label>
      <div className={styles.form_group}>
        <TextField
          id="select_country"
          select
          variant="filled"
          style={{ borderRadius: 'none' }}
          defaultValue="NGN"
          className={styles.tel_list}
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
          name="recievers_phone_number"
          id="recievers_phone_number"
          placeholder="+234 810-019-4732"
          onChange={({ target }) =>
            setOrderForm((order) => ({
              ...order,
              receivers_phonenumber: target.value,
            }))
          }
        />
      </div>

      <label htmlFor="category">Category</label>
      <FormControl fullWidth>
        <Select
          id="category"
          defaultValue={'Select'}
          onChange={({ target }) =>
            setOrderForm((order) => ({
              ...order,
              category: target.value,
            }))
          }
        >
          <MenuItem value="Select" disabled>
            Select One
          </MenuItem>
          {categories.map((category, id) => (
            <MenuItem
              key={id}
              value={category}
              style={{ textTransform: 'capitalize' }}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <label htmlFor="item_value">Item Value</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="number"
        name="item_value"
        id="item_value"
        placeholder="Enter Value of Item"
        onChange={({ target }) => {
          setTotal(parseInt(target.value));
          return setOrderForm((order) => ({
            ...order,
            item_value: target.value,
          }));
        }}
      />

      <label htmlFor="note">Note</label>
      <TextField
        className={styles.form_control}
        fullWidth
        type="text"
        name="note"
        id="note"
        multiline
        rows={4}
        placeholder="e.g please drop-off with my gateman"
        onChange={({ target }) =>
          setOrderForm((order) => ({
            ...order,
            delivery_note: target.value,
          }))
        }
      />
    </div>
  );
};

export default DeliveryDetails;
