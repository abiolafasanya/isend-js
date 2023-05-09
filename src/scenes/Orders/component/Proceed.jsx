import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { formatCurrency } from '../../../utils/formatter';
import styles from '../CreateOrder.module.css';
import Axios from '../../../api/axios';

const Proceed = ({
  orderForm,
  setComplete,
  computeTotal,
  isComputed,
  setIsComputed,
  setOrderId,
  setOrderForm,
}) => {
  const increment = () => {
    setOrderForm((order) => ({
      ...order,
      delivery_fare: parseInt(order.delivery_fare) + 100,
    }));
    console.log(orderForm.delivery_fare);
  };

  const decrement = () => {
    if (orderForm.delivery_fare !== 0) {
      setOrderForm((order) => ({
        ...order,
        delivery_fare: parseInt(order.delivery_fare) - 100,
      }));
      console.log(orderForm.delivery_fare);
    }
  };

  const handleProceed = async () => {
    delete orderForm.base_fee;
    console.log('data', orderForm);

    try {
      const response = await Axios.post('/admin/create-order', orderForm);

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setOrderId(response.data.data);

        setComplete(true);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleComputeTotal = async () => {
    const params = {
      address: orderForm.delivery_details.address,
      orderForm,
    };
    const result = await computeTotal(params);
    if (result) {
      console.log(result.delivery_fare, 'result here');
      console.log(result, 'compute complete');
      setIsComputed(true);
      setOrderForm((order) => ({
        ...order,
        delivery_fare: result?.delivery_fare,
        base_fee: result?.base_fee,
      }));
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
      <Box className={''}>
        <div className={styles.fare}>
          <h5>Distance fare</h5>
          <div>{formatCurrency(orderForm.delivery_fare)}</div>
        </div>
        <div className={styles.fare}>
          <h5>Base fare</h5>
          <div>
            {formatCurrency(orderForm?.base_fee ? orderForm?.base_fee : 0)}
          </div>
        </div>
      </Box>
      <Box className={styles.total_container}>
        <h3>Total</h3>
        <Box className={styles.counter}>
          <Button variant="inherit" onClick={() => decrement()}>
            -
          </Button>
          <div>
            {formatCurrency(
              parseInt(orderForm?.delivery_fare) +
                parseInt(orderForm?.base_fee ? orderForm?.base_fee : 0)
            )}
          </div>
          <Button variant="inherit" onClick={() => increment()}>
            +
          </Button>
        </Box>
      </Box>

      {!isComputed && (
        <Button
          className={styles.proceed_btn}
          variant="contained"
          fullWidth={true}
          onClick={() => handleComputeTotal()}
        >
          Compute Total
        </Button>
      )}

      {isComputed && (
        <Button
          className={styles.proceed_btn}
          variant="contained"
          fullWidth={true}
          onClick={() => handleProceed()}
        >
          Proceed
        </Button>
      )}
    </section>
  );
};

export default Proceed;
