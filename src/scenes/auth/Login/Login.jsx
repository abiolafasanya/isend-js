import React from 'react'
import styles from './Login.module.css';
import Arror from '../../../assets/images/arrow.svg'

const Login = () => {
  return (
    <div className={styles.login}>
        <div className={styles.top}></div>
        <div className={styles.form}>
            <h2>Welcome Back!!</h2>
            <form>
                <input type="email" name="email" id="email" className={styles.form_input} />
                <input type="password" name="password" id="password" className={styles.form_input} />
                <button>Authenticate <img src={Arror} alt='arrow icon'/> </button>
            </form>
        </div>
        <div className={styles.bottom}></div>
    </div>
  )
}

export default Login