import { formatCurrency } from '../../utils/formatter';
import styles from './Status.module.css';
import Revenue from '../../assets/icons/revenue.svg';
import Rider from '../../assets/icons/rider.svg';
import Customer from '../../assets/icons/customer.svg';
import Orders from '../../assets/icons/orders.svg';
import { useEffect, useState } from 'react';
import Axios from '../../api/axios';
  



const Status = () => {
  const [status, setStatus] = useState({revenues: 0, orders: 0, customers: 0, riders: 0})
  useEffect(() => {
    async function handlerGetStatus() {
      const {data: orders} = await Axios.get('/admin/orders')
      const {data: customers} = await Axios.get('/admin/customers')
      const {data: riders} = await Axios.get('/admin/riders')

      let revenues = 0;
      let ordersArr = orders.order
      for (let i = 0; i < ordersArr.length; i++) {
        revenues += ordersArr[i].total;
      }
       const data = {
         revenues: revenues,
         orders: orders.pagination.totalResults,
         customers: customers.pagination.totalResults,
         riders: riders.pagination.totalResults,
       };
      setStatus(data);
      orderGain(orders)

  
    }
    handlerGetStatus()
  }, [])

  function orderGain(orderArray) {
    let totalGain = 0;
    let today = new Date();
    
    for (let i = 0; i < orderArray.length; i++) {
      let orderDate = new Date(orderArray[i].timestamp);
      let timeDiff = Math.abs(today.getTime() - orderDate.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (diffDays <= 7) {
        totalGain += orderArray[i].total - orderArray[i].cogs;
        return totalGain;
      }
    }    
  }


  const staticStatus = [
    {
      icon: Revenue,
      name: 'Total Revenue',
      amount: parseInt(status.revenues),
      gain: 235,
      isCurrency: true,
    },
    {
      icon: Orders,
      name: 'Orders',
      amount: status.orders,
      gain: 20,
      isCurrency: false,
    },
    {
      icon: Customer,
      name: 'Customers',
      amount: status.customers,
      gain: 10,
      isCurrency: false,
    },
    {
      icon: Rider,
      name: 'Riders',
      amount: status.riders,
      gain: -3,
      isCurrency: false,
    },
  ];


  return (
    <article className={styles.status}>
      <div className={styles.card}>
        {staticStatus.map((status, index) => (
          <div key={index} className={styles.card_content}>
            <img src={status.icon} alt="Icon" />
            <div>
              <h4>{status.name}</h4>
              <div className={styles.card_gain}>
                <h2>
                  {status.isCurrency
                    ? formatCurrency(status.amount)
                    : status.amount}
                </h2>
                <span className={styles.card_badge}>
                  <span
                    className={
                      typeof status.gain === 'number' && status.gain > 1
                        ? styles.card_badge_success
                        : styles.card_badge_danger
                    }
                  >
                    {' '}
                    {typeof status.gain === 'number' &&
                      (status.gain > 1
                        ? `+${status.gain}`
                        : status.gain < 1
                        ? `${status.gain}`
                        : `${status.gain}`)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Status;
