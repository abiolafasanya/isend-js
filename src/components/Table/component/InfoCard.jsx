import React, { useState } from 'react';
import styles from './InfoCard.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const InfoCard = ({ data }) => {
  const [openInfoCard, setOpenInfoCard] = useState(true);
  console.log(data);
  return (
    <>
      {openInfoCard && (
        <div className={styles.infoCard}>
          <div className={styles.cancelBox}>
            <ClearIcon
              className={styles.cancel}
              onClick={() => setOpenInfoCard((open) => !open)}
            />
          </div>
          <article>
            <div className={styles.data}>
              <h4>Senders Name</h4>
              <p>{data.senders_name ? data.senders_name : 'not available'}</p>
            </div>
            <div className={styles.data}>
              <h4>Senders Email</h4>
              <p>{data.senders_email ? data.senders_email : 'not available'}</p>
            </div>
            <div className={styles.data}>
              <h4>Senders Phone</h4>
              <p>
                {data.senders_phonenumber ? data.senders_phonenumber : 'not available'}
              </p>
            </div>
            <div className={styles.data}>
              <h4>Status</h4>
              <p>{data.order_status ? data.order_status : 'not available'}</p>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default InfoCard;
