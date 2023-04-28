import React, { useState, useEffect, createContext } from 'react';

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

  const [auth, setAuth] = useState({ isLoggedIn: false, token: null, user: null });

  useEffect(() => {
    setAuth((prev) => {
      const auth = localStorage.getItem('auth');
      if (auth) return JSON.parse(auth);
      return prev;
    });
  }, []);

  const handleSetAuth = (auth) => {
    localStorage.setItem('auth', JSON.stringify(auth));
    setAuth(auth);
    return auth;
  };

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
        handleLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
