import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Alert,
  AlertTitle,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './CreateOrder.module.css';
import { ArrowBack } from '@mui/icons-material';
import { formatCurrency } from '../../utils/formatter';
import { Link } from 'react-router-dom';
import OrderCompleted from './component/OrderCompleted';
import Axios from '../../api/axios';

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

const CreateOrder = () => {
  const [total, setTotal] = useState(0);
  const [sendersAddr, setSendersAddr] = useState('');
  const [receiversAddr, setRecieversAddr] = useState('');
  // const [receiversAddr, setRecieiversAddr] = useState(null);
  // const [addressData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [complete, setComplete] = useState(false);
  const [orderForm, setOrderForm] = useState(defaultFormValue);

  const increment = () => {
    setTotal((total) => total + 100);
  };

  const decrement = () => {
    if (total !== 0) {
      setTotal((total) => total - 100);
    }
  };

  const handleProceed = async () => {
    console.log('old data', orderForm);
    orderForm.item_value = total;
    console.log('new data', orderForm);

    const { data, status } = await Axios.post('/dispatch/', orderForm);

    if (status === 200 || status === 201) {
      console.log(data);
      setComplete(true);
    }
    if (data.error) {
      console.log(data.error);
    }

    alert('error: data need to be handled');
  };
  // const url = 'https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/geocoding?address=vgc'

  const handleFetchSenderAddress = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      console.log(searchTerm);
      let Endpoint;
      if (process.env.NODE_ENV !== 'production') {
        Endpoint = `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/place-autocomplete?address=${searchTerm}`;
      } else {
        Endpoint = `${process.env.REACT_APP_AUTOCOMPLETE_ADDRESS}=${searchTerm}`;
      }

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
    setSendersAddr(event.target.value);
  };

  const handleFetchRecieverAddress = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length > 0) {
      console.log(searchTerm);
      setTimeout(() => {
        fetch(
          `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/place-autocomplete?address=${searchTerm}`
        )
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

  const onSuggestionHandler = async (text) => {
    setSendersAddr(text);
    const geoData = await handleFetchLongLat(text);
    console.log(geoData.data.result);
    let result = geoData.data.result;
    setOrderForm((order) => ({
      ...order,
      senders_address: text,
      hub_location: {
        address: text,
        coordinates: [result?.lat, result?.lng],
      },
      // senders_address: geoData.data.result,
    }));
    setSuggestions([]);
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
    setSuggestions([]);
  };

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

  return (
    <>
      {!complete ? (
        <Box className={styles['create-order']}>
          <header className={styles.header}>
            <h2>Order Form</h2>
          </header>
          <main className={styles.main}>
            <Link to="/orders" style={{ color: '#000' }}>
              <Button
                color="inherit"
                style={{ backgroundColor: '#BABABA' }}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
            </Link>

            <Box className={styles.sections}>
              <section>
                <h3>Pickup Details</h3>
                <Box className={styles['area-a']}>
                  <Box className={styles.pickup_details}>
                    <form>
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
                        type="text"
                        value={sendersAddr}
                        name="senders_address"
                        id="senders_address"
                        placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
                        onChange={handleFetchSenderAddress}
                        list="addrlist"
                      />
                      {suggestions && suggestions.length > 0 && (
                        <div id="addrlist" className={styles.addressList}>
                          {suggestions?.map((address, i) => (
                            <div
                              className={styles.list}
                              onClick={() =>
                                onSuggestionHandler(address.description)
                              }
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
                      {/* receiver details */}
                      <div style={{ marginTop: 40 }}></div>
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
                      <label htmlFor="recievers_address">
                        Receiver's Address
                      </label>
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
                              onClick={() =>
                                onSuggestionReceiverHandler(address.description)
                              }
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
                          value={'electronics'}
                          onChange={({ target }) =>
                            setOrderForm((order) => ({
                              ...order,
                              category: target.value,
                            }))
                          }
                        >
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
                    </form>
                  </Box>
                </Box>
              </section>
              <section className={styles['area-b']}>
                <h3>Payment Details</h3>

                <Box className={styles.warning_alert}>
                  <Alert severity="warning">
                    <AlertTitle>
                      Packages containing restricted items such as alcohol,
                      sharp objects are not be eligible for delivery.
                    </AlertTitle>
                  </Alert>
                </Box>
                <Box className={styles.total_container}>
                  <h3>Total</h3>
                  <Box className={styles.counter}>
                    <Button variant="inherit" onClick={() => decrement()}>
                      -
                    </Button>
                    <div>{formatCurrency(total)}</div>
                    <Button variant="inherit" onClick={() => increment()}>
                      +
                    </Button>
                  </Box>
                </Box>
                <Button
                  className={styles.proceed_btn}
                  // sx={proceed_btn}
                  variant="contained"
                  fullWidth={true}
                  onClick={handleProceed}
                >
                  Proceed
                </Button>
              </section>
            </Box>
          </main>
        </Box>
      ) : (
        <OrderCompleted detail={orderForm} />
      )}
    </>
  );
};

export default CreateOrder;
