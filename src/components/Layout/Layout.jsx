import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.css';
import useApp from '../../hooks/useApp';

const Layout = () => {
  const {auth} = useApp();
  const location = useLocation();
  return (
   <>
   {auth?.isLoggedIn ? (
     <div className={styles.layout}>
     <Sidebar />
     <Outlet />
   </div>
   ): (<Navigate to={'/login'} state={{ from: location.pathname }} replace />)}
   </>
  );
};

export default Layout;