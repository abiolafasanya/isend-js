import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import Arror from '../../../assets/images/arrow.svg';
import Axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useApp from '../../../hooks/useApp';
import LoadingButton from '@mui/lab/LoadingButton';

const Login = () => {
  const navigate = useNavigate();
  const { auth, handleSetAuth } = useApp();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth?.isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      if (body.email === '' || body.password === '') {
        toast.error('Please fill in your email and password');
        return;
      }

      const response = await Axios.post('/admin/login', body);

      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success('Login successful');
        // redirect user to desired page
        handleSetAuth({ user: { email: body.email } });
        navigate('/authenticate', { replace: true });
      } else {
        setLoading(false);
        toast.error('Invalid credentials');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
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
    <div className={styles.login}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <h2>Welcome Back!!</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className={styles.form_input}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
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

export default Login;
