import styles from './Navbar.module.css';
import Bell from '../../assets/icons/bell.svg';
import Chat from '../../assets/icons/chat.svg';
import Options from '../../assets/icons/options.svg';
import { Link } from 'react-router-dom';

const menus = [
  { name: 'Notifications', icon: Bell },
  { name: 'Chat', icon: Chat },
  { name: 'Options', icon: Options },
];


const Navbar = ({title}) => {
  return (
    <div className={styles.navbar}>
      <div>
        <h1>{title}</h1>
      </div>
      <ul className={styles.navbar_menu}>
        {/* {menus.map((menu, index) => (
          ))} */}
        <div>
          <img src={menus[0].icon} alt="logo" />
        </div>
        <div>
          <img src={menus[1].icon} alt="logo" />
        </div>
        <div className={styles.dots}>
          <img src={menus[2].icon} alt="logo" />
          <div>
            <Link to={''}></Link>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
