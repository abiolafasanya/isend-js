import React, { useEffect } from 'react';
import styles from './Login.module.css';
import Arror from '../../../assets/images/arrow.svg';
import Axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useApp from '../../../hooks/useApp';

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useApp();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [auth?.isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      if (body.email === '' || body.password === '') {
        toast.error('Please fill in your email and password');
        return;
      }
      console.log(body);

      // return navigate('/authenticate', {replace: true});

      const response = await Axios.post('/admin/login', body);

      if (response.status === 200 || response.status === 201) {
        toast.success('Login successful');
        // redirect user to desired page
        navigate('/authenticate', {replace: true});
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        console.log('Error message:', errorMessage);
        toast.error(errorMessage);
        return;
      }
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
            placeholder='Email Address'
            className={styles.form_input}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder='Password'
            className={styles.form_input}
          />
          <button>
            Authenticate <img src={Arror} alt="arrow icon" />{' '}
          </button>
        </form>
      </div>
      <div className={styles.bottom}></div>
      <ToastContainer />
    </div>
  );
};

export default Login;
