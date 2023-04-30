import React from 'react';
import styles from './Otp.module.css';
import Arror from '../../../assets/images/arrow.svg';
import Axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApp from '../../../hooks/useApp';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const { handleSetAuth } = useApp();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = JSON.parse(localStorage.getItem('auth')).user.email
    const body = {
      otp: e.target.otp.value,
      email
    };
  //   handleSetAuth({isLoggedIn: true})
  //   toast.success('Authenticated');
  //   navigate('/', {replace: true});
  //  return console.log(body);

    const { data } = await Axios.post('/admin/verify', body);
    console.log(data);
    if (data.success) {
      toast.success('Authenticated');
      handleSetAuth({isLoggedIn: true, user: {email}});
      setTimeout(() => {
        navigate('/', {replace: true});
      }, 1000);
    }
    if (data.error) {
      toast.error(data.message);
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
            placeholder='Enter your Otp Code'
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
