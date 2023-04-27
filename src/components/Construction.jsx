import React from 'react'
import underConstruction from '../assets/images/construction.png';
import styles from './errors.module.css'

const Construction = () => {
  return (
    <div className={styles.construction}>
        <div className={styles.image}>
            <img src={underConstruction} alt="under construction" />
        </div>
    </div>
  )
}

export default Construction