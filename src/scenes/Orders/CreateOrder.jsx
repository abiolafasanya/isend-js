import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import styles from './CreateOrder.module.css';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import OrderCompleted from './component/OrderCompleted';
import { defaultFormValue } from './helpers';
import Proceed from './component/Proceed';
import PickupDetails from './component/PickupDetails';
import DeliveryDetails from './component/DeliveryDetails';

const CreateOrder = () => {
  const [total, setTotal] = useState(0);
  const [sendersAddr, setSendersAddr] = useState('');
  const [receiversAddr, setRecieversAddr] = useState('');
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

                      <PickupDetails
                        sendersAddr={sendersAddr}
                        setOrderForm={setOrderForm}
                        setSendersAddr={setSendersAddr}
                        setSuggestions={setSuggestions}
                        suggestions={suggestions}
                      />

                      <div style={{ marginTop: 40 }}></div>

                      <DeliveryDetails
                        receiversAddr={receiversAddr}
                        setOrderForm={setOrderForm}
                        setRecieversAddr={setRecieversAddr}
                        setSuggestions={setSuggestions}
                        setTotal={setTotal}
                        suggestions={suggestions}
                        orderForm={orderForm}
                      />
                      
                    </form>
                  </Box>
                </Box>
              </section>
              <Proceed
                decrement={decrement}
                increment={increment}
                orderForm={orderForm}
                setComplete={setComplete}
                total={total}
                key={Date.now()}
              />
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
