import React, { useState, useEffect, createContext } from 'react';
import Axios from '../api/axios';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? JSON.parse(storedTheme) : true;
  });

  const [openModal, setOpenModal] = useState(false);
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [customModalTitle, setCustomModalTitle] = useState('');
  const [customModalContent, setCustomModalContent] = useState('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [events, setEvent] = useState(false);
  const [error, setError] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);

  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });


  useEffect(() => {
    setAuth((prev) => {
      const auth = localStorage.getItem('auth');
      if (auth) return JSON.parse(auth);
      return prev;
    });
  }, []);

  const toggleSidebar = () => {
    setCloseSidebar(close => !close)
  }

  const handleSetAuth = (auth) => {
    const isAuth = localStorage.getItem('auth');
    if (isAuth) {
      localStorage.removeItem('auth');
    }
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
    return auth;
  };

  const getAllOrders = async ({pageData}) => {
    try {
      const Endpoint = `/admin/orders?limit=${pageData.limit}}&page=${pageData.page}`; // limit=20&page=6
      const { data } = await Axios.get(Endpoint);

      // sort order by date descending using updatedAt timestamp
      const sortByDesc = data.order.sort(function (a, b) {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
      setEvent(event => !event)
      
      console.log(events, data);
      return {pagination: data.pagination, orders: sortByDesc} 
    } catch (error) {
      console.log('Error getting order data:', error.message);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({ isLoggedIn: false });
  };

  const storeOrderId = (order_id) => {
    setOrderId(order_id);
    console.log('track order_id: ', order_id);
  };

  const toggleModal = () => {
    setOpenModal((modal) => !modal);
  };

  const toggleCustomModal = () => {
    console.log(openCustomModal);
    // setMessage('')
    setOpenCustomModal((modal) => !modal);
  };

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(dark));
  }, [dark]);

  const toggleTheme = () => {
    setDark((prevDark) => !prevDark);
  };

  return (
    <AppContext.Provider
      value={{
        dark,
        toggleTheme,
        openModal,
        toggleModal,
        storeOrderId,
        orderId,
        toggleCustomModal,
        openCustomModal,
        customModalContent,
        setCustomModalContent,
        customModalTitle,
        setCustomModalTitle,
        message,
        setMessage,
        events,
        setEvent,
        error,
        setError,
        auth,
        handleSetAuth,
        handleLogout,
        closeSidebar,
        toggleSidebar,
        getAllOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
