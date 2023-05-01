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
  const [total, setTotal] = useState(2700);
  return (
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
                  />
                  <label htmlFor="senders_address">Senders Address</label>
                  <TextField
                    className={styles.form_control}
                    fullWidth
                    type="text"
                    name="senders_address"
                    id="senders_address"
                    placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
                  />
                  <label htmlFor="phone_number">Senders Phone Number</label>
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
                      name="phone_number"
                      id="phone_number"
                      placeholder="+234 810-019-4732"
                    />
                  </div>
                  <label htmlFor="sender_email">Senders Email</label>
                  <TextField
                    className={styles.form_control}
                    fullWidth
                    type="email"
                    name="sender_email"
                    id="sender_email"
                    placeholder=""
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
                  />
                  <label htmlFor="recievers_address">Receiver's Address</label>
                  <TextField
                    className={styles.form_control}
                    fullWidth
                    type="text"
                    name="recievers_address"
                    id="recievers_address"
                    placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
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
                    />
                  </div>

                  <label htmlFor="category">Category</label>
                  <FormControl fullWidth>
                    <Select id="category" value={10} onChange={() => {}}>
                      {categories.map((category, id) => (
                        <MenuItem
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
                    type="text"
                    name="item_value"
                    id="item_value"
                    placeholder="Enter Value of Item"
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
                  Packages containing restricted items such as alcohol, sharp
                  objects are not be eligible for delivery.
                </AlertTitle>
              </Alert>
            </Box>
            <Box className={styles.total_container}>
              <h3>Total</h3>
              <Box className={styles.counter}>
                <Button onClick={() => setTotal((total) => total + 100)}>
                  +
                </Button>
                <div>{formatCurrency(total)}</div>
                <Button onClick={() => setTotal((total) => total - 100)}>
                  -
                </Button>
              </Box>
            </Box>
            <Button
              //   className={styles.proceed_btn}
              sx={{
                color: '#000',
                marginTop: '1rem',
                backgroundColor: '#FFC24D',
                ':hover': { backgroundColor: '#ffd485' },
              }}
              variant="contained"
              fullWidth
            >
              Proceed
            </Button>
          </section>
        </Box>
      </main>
    </Box>
  );
};

export default CreateOrder;
