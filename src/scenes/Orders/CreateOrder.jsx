import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import styles from './CreateOrder.module.css';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import OrderCompleted from './component/OrderCompleted';
import { computeTotal, defaultFormValue } from './helpers';
import Proceed from './component/Proceed';
import PickupDetails from './component/PickupDetails';
import DeliveryDetails from './component/DeliveryDetails';

const CreateOrder = () => {
  const [sendersAddr, setSendersAddr] = useState('');
  const [receiversAddr, setRecieversAddr] = useState('');
  const [complete, setComplete] = useState(false);
  const [orderForm, setOrderForm] = useState(defaultFormValue);
  const [isComputed, setIsComputed] = useState(false);
  const [orderId, setOrderId] = useState('');

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
                        setIsComputed={setIsComputed}
                      />

                      <div style={{ marginTop: 40 }}></div>

                      <DeliveryDetails
                        receiversAddr={receiversAddr}
                        setOrderForm={setOrderForm}
                        setRecieversAddr={setRecieversAddr}
                        setIsComputed={setIsComputed}
                      />
                    </form>
                  </Box>
                </Box>
              </section>
              <Proceed
                orderForm={orderForm}
                setComplete={setComplete}
                key={Date.now()}
                computeTotal={computeTotal}
                isComputed={isComputed}
                setIsComputed={setIsComputed}
                setOrderId={setOrderId}
                setOrderForm={setOrderForm}
              />
            </Box>
          </main>
        </Box>
      ) : (
        <OrderCompleted detail={orderForm} orderId={orderId} />
      )}
    </>
  );
};

export default CreateOrder;
