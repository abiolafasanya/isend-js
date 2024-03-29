import styles from './Navbar.module.css';
import Bell from '../../assets/icons/bell.svg';
import Chat from '../../assets/icons/chat.svg';
import Options from '../../assets/icons/options.svg';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useApp from '../../hooks/useApp';
import MenuIcon from '@mui/icons-material/Menu';

const menus = [
  { name: 'Notifications', icon: Bell },
  { name: 'Chat', icon: Chat },
  { name: 'Options', icon: Options },
];


const Navbar = ({ title }) => {
  const { handleLogout, toggleSidebar } = useApp();
  const settings = [
    { name: 'Profile', action: () => {} },
    { name: 'Settings', action: () => {} },
    { name: 'Logout', action: handleLogout },
  ];
  
  const [openSettings, setOpenSettings] = useState(false);

  const handleCloseUserMenu = () => {
    setOpenSettings((open) => !open);
  };

  const handleOpenUserMenu = () => {
    setOpenSettings((open) => !open);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        <MenuIcon className={styles.hamburger} onClick={toggleSidebar} />
        <h1>{title}</h1>
      </div>
      <ul className={styles.navbar_menu}>
        <Box>
          <img src={menus[0].icon} alt="logo" />
        </Box>
        <Box>
          <img src={menus[1].icon} alt="logo" />
        </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img src={menus[2].icon} alt="dot icon" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '65px' }}
              id="menu-appbar"
              anchorEl={openSettings ? document.body : null}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              open={openSettings}
              onClose={handleCloseUserMenu}
            >
            
              {settings.map((setting, i) => (
                <MenuItem key={i} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => setting.action()}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </ul>
    </div>
  );
};

export default Navbar;
