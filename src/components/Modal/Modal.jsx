import React from 'react';
import styles from './Modal.module.css';
import useApp from '../../hooks/useApp';
import Cancel from '../../assets//icons/cancel.svg';
import Axios from '../../api/axios';

const Modal = () => {
  const {
    openModal,
    toggleModal,
    toggleCustomModal,
    customModalTitle,
    setCustomModalTitle,
    orderId,
    message,
    setMessage,
    setEvent,
  } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderId) {
      const body = {
        order_txn_ref: e.target.reference_number.value,
        order_id: orderId,
      };

      const request = await updateStatus(body);
      if (request.status === 'success') {
        console.log(request);
        toggleModal();
        setCustomModalTitle('Payment updated');
        setMessage('Payment status has been updated successfully!');
        toggleCustomModal();
        setEvent(true)
        return;
      }
      return;
    } else {
      setCustomModalTitle('Payement failed');
      setMessage('Opps something went wrong while processing the request');
    }
  };

  const updateStatus = async (body) => {
    const { data } = await Axios.patch(
      'https://isend-v1.herokuapp.com/api/v1/admin/payment',
      body
    );
    return data;
  };

  return (
    <>
      {openModal && (
        <div className={styles.modal}>
          <CustomModal
            title={customModalTitle}
            message={message}
          />
          <article className={styles.card}>
            <img
              src={Cancel}
              alt="close icon"
              className={styles.close_icon}
              onClick={toggleModal}
            />
            <header>
              <h2>Enter Reference Number</h2>
            </header>
            <main>
              <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <select
                    defaultValue="Select Status"
                    className={styles.status_option}
                    id="status"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                  <input
                    type="text"
                    name="reference_number"
                    id="reference_number"
                    placeholder="Enter a reference number"
                    className={styles.status_input}
                  />
                </div>
                <div className={styles.form_btn}>
                  <button
                    className={styles.btn_secondary}
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button className={styles.btn_warn}>Confirm</button>
                </div>
              </form>
            </main>
            <footer></footer>
          </article>
        </div>
      )}
    </>
  );
};

export default Modal;

export const CustomModal = ({ title, message }) => {
  const { toggleCustomModal, openCustomModal } = useApp();
  return (
    <>
      {openCustomModal && (
        <div className={styles.modal}>
          <article className={styles.card_custom}>
            <img
              src={Cancel}
              alt="close icon"
              className={styles.close_icon}
              onClick={toggleCustomModal}
            />
            <header>
              <h2 style={{  }}>{title}</h2>
            </header>
            <main className={styles.modal_message}>{message}</main>
          </article>
        </div>
      )}
    </>
  );
};
