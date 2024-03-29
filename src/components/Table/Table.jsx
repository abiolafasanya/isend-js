import styles from './table.module.css';
import TableHeader from './TableHeader';
import { formatCurrency, formatDate } from '../../utils/formatter';
import SearchIcon from '../../assets/images/Icon.svg';
import useApp from '../../hooks/useApp';
import { CustomModal } from '../Modal/Modal';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import {
  progressUpdateHandler,
  getOrderProgress,
  getAllRiders,
  assignRider,
} from './requests';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import InfoCard from './component/InfoCard';

const Table = ({ tableHeader, tableData }) => {
  const [progress, setProgress] = useState([]);
  const [riders, setRiders] = useState([]);
  const [orders, setOrders] = useState(() => tableData);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openInfoCardId, setOpenInfoCardId] = useState(null);

  const toggleInfoCard = (data) => {
    // console.log(openInfoCardId);
    setOpenInfoCardId(data.order_id);
  };

  useEffect(() => {
    const progressData = async () => {
      const data = await getOrderProgress().then(
        (progress) => progress.data.progress
      );
      setProgress(data);
      setRiders(await getAllRiders());
      setOrders(tableData);
      setLoading(false);
    };
    progressData();
  }, [tableData]);

  const {
    toggleModal,
    storeOrderId,
    message,
    setMessage,
    customModalTitle,
    toggleCustomModal,
    setCustomModalTitle,
    setError,
  } = useApp();

  const handlePaymentModal = async (order_id) => {
    if (order_id === undefined) {
      setError(true);
      setSuccess(false);
      setCustomModalTitle('Operation failed');
      setMessage(
        'You cant update this payment because the Order Id is: ' + order_id
      );
      toggleCustomModal();
      return;
    }
    setError(false);
    setSuccess(true);
    storeOrderId(order_id);
    toggleModal();
  };

  const stateOfStatus = (index) =>
    tableData[index]?.order_status === 'pending'
      ? 'status-pending'
      : tableData[index]?.order_status === 'active'
      ? 'status-active'
      : tableData[index]?.order_status === 'canceled'
      ? 'status-canceled'
      : 'status-completed';

  const paymentStatus = (index) =>
    tableData[index]?.payment_status === 'paid'
      ? 'btn-paid'
      : tableData[index]?.payment_status === 'pending'
      ? 'btn-pending'
      : tableData[index]?.payment_status === 'failed'
      ? 'btn-failed'
      : '';

  const handleProgress = async (e) => {
    const event = JSON.parse(e.currentTarget.value);

    const body = {
      order_progress: {
        title: event.title,
        value: event.value,
        message: event.message,
      },
      order_id: event.order_id,
    };
    if (body.order_id === undefined) {
      setError(true);
      setMessage('Order Id is required');
      setCustomModalTitle('Operation failed!');
      toggleCustomModal();
      return;
    }
    setError(false);
    setSuccess(true);
    await progressUpdateHandler(body);
    toast.info(`Progess changed to ${body.order_progress.title}`);
  };

  const handleAssignRider = async (e) => {
    const event = JSON.parse(e.currentTarget.value);
    console.log(event);

    const body = {
      assignee: {
        name: event.name,
        phone_number: event.phone_number,
        email: event.email,
      },
      order_id: event.order_id,
    };
    console.log(body);
    if (body.order_id === undefined) {
      setError(true);
      setMessage('Order Id is required');
      setCustomModalTitle('Operation failed!');
      toggleCustomModal();
      return;
    }
    setError(false);
    setSuccess(true);
    const data = await assignRider(body);
    toast.info(`${body.assignee.name} has been assigned`);
    console.log(data);
  };

  return (
    <div className={styles.table}>
      <CustomModal
        title={customModalTitle}
        message={message}
        success={success}
      />

      <div className={styles.table_searchbox}>
        <input
          type="text"
          name="search"
          id="search"
          className={styles.table_search}
          placeholder="Search Orders, Deliveries"
        />
        <img src={SearchIcon} alt="search icon" />

        <Link to="/create-order">
          <Button startIcon={<AddIcon />}>Create Order</Button>
        </Link>
      </div>
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            {tableHeader?.map((title, id) => (
              <TableHeader key={id} title={title} />
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr style={{ width: '100%', textAlign: 'center' }}>
              <td>Loading...</td>
            </tr>
          ) : (
            orders?.map((data, id) => (
              <tr className={styles.tableData} key={id}>
                <td className={styles.ellipsis}>
                  {formatDate(data.updatedAt)}
                </td>
                <td>{data.category}</td>
                <td className={styles.ellipsis}>
                  <Button onClick={() => toggleInfoCard(data)}>
                    {data.order_id ? data.order_id : 'Not Available'}
                  </Button>
                  { openInfoCardId === data.order_id &&
                    <InfoCard
                    data={data}
                  />
                  }
                </td>
                <td>{formatCurrency(data.total)}</td>
                <td className={styles[`${stateOfStatus(id)}`]}>
                  {data?.order_status}
                </td>
                <td className={''}>
                  <button
                    className={styles[`${paymentStatus(id)}`]}
                    onClick={() => handlePaymentModal(data.order_id)}
                  >
                    {data.payment_status}
                  </button>
                </td>
                <td className={styles.status}>
                  <select
                    onChange={handleAssignRider}
                    defaultValue={
                      data.assignee.name ? data?.assignee.name : 'Unassigned'
                    }
                  >
                    <option
                      disabled
                      value={
                        data.assignee.name ? data?.assignee.name : 'Unassigned'
                      }
                    >
                      {data.assignee.name ? data?.assignee.name : 'Unassigned'}
                    </option>
                    {riders.map((rider, id) => (
                      <option
                        key={rider.id + `-${id}`}
                        value={JSON.stringify({
                          ...rider,
                          order_id: data.order_id,
                        })}
                      >
                        {rider.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    id="progress_status"
                    onChange={handleProgress}
                    defaultValue={
                      data.order_progress.title
                        ? data.order_progress.title
                        : data.order_progress
                    }
                  >
                    <option
                      disabled
                      value={
                        data.order_progress.title
                          ? data.order_progress.title
                          : data.order_progress
                      }
                    >
                      {data.order_progress.title
                        ? data.order_progress.title
                        : data.order_progress}
                    </option>
                    {progress.map((progress, id) => (
                      <option
                        key={progress.id + `-${id}`}
                        value={JSON.stringify({
                          ...progress,
                          order_id: data.order_id,
                        })}
                      >
                        {progress.title}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Table;
