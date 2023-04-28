import React, { useState } from 'react'
import styles from './Modal.module.css';
import Cancel from '../../assets//icons/cancel.svg';

const IModal = ({children, isOpen=true}) => {
    const [open, setOpen] = useState(isOpen)
    const toggleOpen = () => {
        setOpen(open => !open)
    }
    return (
      <>
        {open && (
          <div className={styles.modal}>
            <article className={styles.card_custom}>
              <img
                src={Cancel}
                alt="close icon"
                className={styles.close_icon}
                onClick={toggleOpen}
              />
              <main className={styles.modal_message}>{children}</main>
            </article>
          </div>
        )}
      </>
    );
}

export default IModal