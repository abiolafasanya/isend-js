import { formatCurrency } from '../../utils/formatter';
import styles from './Status.module.css';
import Revenue from '../../assets/icons/revenue.svg';
import Rider from '../../assets/icons/rider.svg';
import Customer from '../../assets/icons/customer.svg';
import Orders from '../../assets/icons/orders.svg';
  

const staticStatus = [
  {
    icon: Revenue,
    name: 'Total Revenue',
    amount: 1382000,
    gain: 235,
    isCurrency: true,
  },
  {
    icon: Orders,
    name: 'Orders',
    amount: 700,
    gain: 20,
    isCurrency: false,
  },
  {
    icon: Customer,
    name: 'Customers',
    amount: 784,
    gain: 235,
    isCurrency: false,
  },
  {
    icon: Rider,
    name: 'Riders',
    amount: 30,
    gain: -3,
    isCurrency: false,
  },
];

const Status = () => {
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
