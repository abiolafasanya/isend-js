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
// import Axios from '../../api/axios';

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

const CreateOrder = () => {
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [addressData, setAddressData] = useState(null);
  const [compolete, setCompolete] = useState(false);
  const [orderForm, setOrderForm] = useState({
    senders_address: '',
    senders_phonenumber: '',
    senders_email: '',
    category: '',
    receivers_name: '',
    receivers_phonenumber: '',
    item_value: 0,
    delivery_note: '',
    price: total,
  });

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

    // const { data } = await Axios.post('/order/', orderForm);

    // console.log(data);

    setCompolete(true);
  };

  const handleFetchAddress = (event) => {
    // event.preventDefault();
    // const location = 'us';
    const searchTerm = event.target.value;
    setSearchTerm(event.target.value);
    console.log(searchTerm);

    // const apiKey = '9765601f337e61ed0cea77114';
    // let endpoint = `https://api.wikiocity.com/r/search?autocomplete=address&search=${searchTerm}&country=${location}&key=${apiKey}`;
    // fetch(endpoint)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Move setOrderForm() inside this block
    //     setAddressData(data);
    //     console.log(data);
    //     setOrderForm((order) => ({
    //       ...order,
    //       senders_address: data,
    //     }));
    //   })
    //   .catch((error) => console.error(error));

    fetch(
      `https://isend-web-65zjgqeauq-ew.a.run.app/booking/api/place-autocomplete?address=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      {!compolete ? (
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
                        value={searchTerm}
                        name="senders_address"
                        id="senders_address"
                        placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
                        onChange={handleFetchAddress}
                      />
                      {/* <datalist id="tickmarks">
                        <option value="0"></option>
                        <option value="10"></option>
                        <option value="20"></option>
                        <option value="30"></option>
                        <option value="50"></option>
                        <option value="80"></option>
                        <option value="100"></option>
                      </datalist> */}
                      {addressData && (
                        <div>
                          <h2>Address Information:</h2>
                          <p>{addressData?.result?.formatted_address}</p>
                          <p>{addressData?.result?.geometry.location.lat}</p>
                          <p>{addressData?.result?.geometry.location.lng}</p>
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
                        name="recievers_address"
                        id="recievers_address"
                        placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
                        onChange={({ target }) =>
                          setOrderForm((order) => ({
                            ...order,
                            recievers_address: target.value,
                          }))
                        }
                      />

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
                            note: target.value,
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
