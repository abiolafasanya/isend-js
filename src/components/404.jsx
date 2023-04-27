import React from 'react'
import NotFound from '../assets/images/page404.png'
import styles from './errors.module.css'

const PageNotFound = () => {
  return (
    <div className={styles.notfound}>
        <div className={styles.image}>
            <img src={NotFound} alt="under construction" />
        </div>
    </div>
  )
}

export default PageNotFound