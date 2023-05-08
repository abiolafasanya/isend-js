import Dashboard from './scenes/dashboard/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from './scenes/Orders/Orders.jsx';
import Layout from './components/Layout/Layout';
import PageNotFound from './components/404.jsx';
import Construction from './components/Construction';
import Login from './scenes/auth/Login/Login.jsx';
import Register from './scenes/auth/Register/Register.jsx';
import Otp from './scenes/auth/Otp/Otp.jsx';
import CreateOrder from './scenes/Orders/CreateOrder.jsx';

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
        </Route>
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authenticate" element={<Otp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
