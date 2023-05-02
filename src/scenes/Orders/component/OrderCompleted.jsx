import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import styles from '../CreateOrder.module.css';

const OrderCompleted = () => {
  return (
    <Box className={styles['create-order']}>
      <header className={styles.header}>
        <h2>Order Form</h2>
      </header>
      <main className={styles.main}>
        <Box sx={styleComplete}>
          <Typography
            sx={{ fontWeight: '700', fontSize: '24px' }}
            component={'h2'}
          >
            Order Created{' '}
          </Typography>
          <Typography component={'p'}>
            A tracking Id and Invoice has been sent to [email or phone number ]{' '}
          </Typography>
          <Button
            sx={{
              backgroundColor: '#FFC24D',
              color: '#000',
              ':hover': { backgroundColor: '#ffc24d' },
              width: '200px'
            }}
          >
            Home
          </Button>
        </Box>
      </main>
    </Box>
  );
};

const styleComplete = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '50vh',
  gap: '1rem',
};

export default OrderCompleted;
