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
              <h4>Assignee Name</h4>
              <p>{data.assignee.name ? data.assignee.name : 'not available'}</p>
            </div>
            <div className={styles.data}>
              <h4>Assignee Number</h4>
              <p>
                {data.assignee.number ? data.assignee.number : 'not available'}
              </p>
            </div>
            <div className={styles.data}>
              <h4>Category</h4>
              <p>{data.category ? data.category : 'not available'}</p>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default InfoCard;
