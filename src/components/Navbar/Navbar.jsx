import styles from './Navbar.module.css';
import Bell from '../../assets/icons/bell.svg';
import Chat from '../../assets/icons/chat.svg';
import Options from '../../assets/icons/options.svg';

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
        {menus.map((menu, index) => (
          <img key={index} src={menu.icon} alt="logo" />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
