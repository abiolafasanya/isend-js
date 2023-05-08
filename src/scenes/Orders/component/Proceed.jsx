import { Alert, AlertTitle, Box, Button } from '@mui/material';
import React from 'react';
import { formatCurrency } from '../../../utils/formatter';
import styles from '../CreateOrder.module.css';
import Axios from '../../../api/axios';

const Proceed = ({ orderForm, total, setComplete, decrement, increment, priceDetails }) => {
  const handleProceed = async () => {
    orderForm.item_value = parseInt(total);
    console.log('data', orderForm);

    const { data, status } = await Axios.post('/dispatch/', orderForm);

    if (status === 200 || status === 201) {
      console.log(data);
      setComplete(true);
    }
    if (data.error) {
      console.log(data.error);
    }
  };

  
  return (
    <section className={styles['area-b']}>
      <h3>Payment Details</h3>

      <Box className={styles.warning_alert}>
        <Alert severity="warning">
          <AlertTitle>
            Packages containing restricted items such as alcohol, sharp objects
            are not be eligible for delivery.
          </AlertTitle>
        </Alert>
      </Box>
      <Box sx={{ marginTop: '2.5rem' }}>
        <div className={styles.fare}>
          <h5>Distance fare</h5>
          <div>{formatCurrency(priceDetails?.delivery_fare)}</div>
        </div>
        <div className={styles.fare}>
          <h5>Base fare</h5>
          <div>{formatCurrency(priceDetails?.base_fee)}</div>
        </div>
      </Box>
      <Box className={styles.total_container}>
        <h3>Total</h3>
        <Box className={styles.counter}>
          <Button variant="inherit" onClick={() => decrement()}>
            -
          </Button>
          <div>{formatCurrency(parseInt(total))}</div>
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
  );
};

export default Proceed;
