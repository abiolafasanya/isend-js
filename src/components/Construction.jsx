import React from 'react'
import underConstruction from '../assets/images/construction.png';
import styles from './errors.module.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Construction = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.construction}>
        <div className={styles.image}>
            <img src={underConstruction} alt="under construction" />
            <Button className={styles.btn} onClick={() => navigate('/', {replace: true})}>Return to Dashboard</Button>
        </div>
    </div>
  )
}

export default Construction