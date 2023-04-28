import React, { useState } from 'react';
import styles from './Otp.module.css';
import Arror from '../../../assets/images/arrow.svg';
import Axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import

const Otp = () => {
  const [message, setMessage] = useState();
  const notify = () => toast(message);
  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(body);
    const url = 'https://isend-v1.herokuapp.com/api/v1/users/login';
    const { data } = await Axios.post(url, body);
    console.log(data);
    if (data.success) {
      setMessage('Login successful');
    }
    if (data.error) {
      setMessage('Login error');
    }
    notify();
  };
  return (
    <div className={styles.otp}>
      <div className={styles.top}></div>
      <div className={styles.form}>
        <h2>Enter your Otp Code</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.form_input}
          />
          <button>
            Authenticate <img src={Arror} alt="arrow icon" />{' '}
          </button>
        </form>
      </div>
      <div className={styles.bottom}>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Otp;
