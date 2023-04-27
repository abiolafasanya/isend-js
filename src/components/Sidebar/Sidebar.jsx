import Logo from '../../assets/images/Logo.svg'
import Dashboard from '../../assets/icons/dashboard.svg';
import Transaction2 from '../../assets/icons/transaction2.svg';
import Customer from '../../assets/icons/customers.svg';
import Rider from '../../assets/icons/riders.svg';
import Deliveries from '../../assets/icons/deliveries.svg';
import Collapse from '../../assets/icons/Collapse.svg';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Dashboard', href: '/', icon: Dashboard },
  { name: 'Transactions', href: '/transactions', icon: Transaction2 },
  { name: 'Customers', href: '/customers', icon: Customer },
  { name: 'Riders', href: '/riders', icon: Rider },
  { name: 'Orders', href: '/orders', icon: Deliveries },
];

const Sidebar = () => {
  // eslint-disable-next-line
  return (
    <aside className={styles.sidebar}>
      <section className={styles.sidebar_section1}>
        <img src={Logo} alt="logo" />
        <img src={Collapse} alt="logo" />
      </section>
      <section className={styles.sidebar_section2}>
        <menu>
          {links.map((link, index) => (
            <NavLink key={index} to={link.href} className={({ isActive, isPending }) =>
            isPending
              ? styles.pending
              : isActive
              ? styles.active
              : styles.nothing
          }>
              <img src={link.icon} alt="icon" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </menu>
      </section>
    </aside>
  );
};

export default Sidebar;
