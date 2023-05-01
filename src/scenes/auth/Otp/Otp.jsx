import React, { useState } from 'react';
import styles from './Otp.module.css';
import Arror from '../../../assets/images/arrow.svg';
import Axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApp from '../../../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const Otp = () => {
  const { auth, handleSetAuth } = useApp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    const email = auth?.user.email;
    const body = {
      otp: e.target.otp.value,
      email,
    };

    if (body.otp === '') {
      toast.error('Please enter a valid otp code');
      return;
    }

    try {
      const { data, status } = await Axios.post(
        'https://isend-api-v1.herokuapp.com/api/v1/admin/verify',
        body
      );
      console.log(data);
      if (data.success || status === 200) {
        toast.success(data.message || 'Authenticated');
        setLoading(false);
        handleSetAuth({ isLoggedIn: true, user: { email }, token: data.token });
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
      if (status === 401 || status === 400 || data.error) {
        console.log('catch error: ' + data.error);
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data || error.response.data.message;
        console.log('Error message:', errorMessage);
        setLoading(false);
        toast.error(errorMessage);
        return;
      }
      setLoading(false);
      toast.error('Login failed');
      console.error('Error occurred during login:', error);
    }
  };
  return (
    <div className={styles.otp}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <h2>Enter your Otp Code</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter your Otp Code"
            className={styles.form_input}
          />
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            endIcon={<img src={Arror} alt="arrow icon" />}
            style={btnStyle}
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </LoadingButton>
        </form>
      </div>
      <div className={styles.bottom}></div>
      <ToastContainer />
    </div>
  );
};

const btnStyle = {
  backgroundColor: '#1d1f22',
  color: '#fff',
  ':hover': { backgroundColor: '#2e2f33', color: '#ccc' },
};

export default Otp;
