import Dashboard from './scenes/dashboard/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './scenes/Orders/index';
import Layout from './components/Layout/Layout';
import PageNotFound from './components/404.jsx';
import Construction from './components/Construction';
import Login from './scenes/auth/Login/Login.jsx';
import Otp from './scenes/auth/Otp/Otp.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/riders" element={<Construction />} />
          <Route path="/customers" element={<Construction />} />
          <Route path="/transactions" element={<Construction />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/authenticator" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
