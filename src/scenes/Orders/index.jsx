import styles from '../dashboard/Dashboard.module.css';
import { useState, useEffect } from 'react';
import Axios from '../../api/axios';
import Pagination from './component/pagination';
import Modal, { CustomModal } from '../../components/Modal/Modal'
import Navbar from '../../components/Navbar/Navbar';
import Table from '../../components/Table/Table';
import useApp from '../../hooks/useApp';

const TableTitle = [
  'date',
  'category',
  'order ID',
  'amount',
  'status',
  'payment',
  'assignee',
  'progress'
];

const Orders = () => {
  const [pagination, setPagination] = useState();
  const [pageData, setPageData] = useState({ limit: 5, page: 1 });
  const [tableData, setTableData] = useState();
  const {events} = useApp()

  useEffect(() => {
    async function getTableData() {
      const data = await getOrder();
      if (!data) {
        console.log('Error getting order data');
        return;
      }
      // sort order by date descending using updatedAt timestamp
      const sortByDesc = data.order.sort(function(a, b) {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
      
      setTableData(sortByDesc);
      setPagination(data.pagination);
      console.log(events, 'testing');
    }
    getTableData();
    return () => {
      console.log('cleanup complete');
    };
  }, [pageData, events]);

  const getOrder = async () => {
    const Endpoint = `https://isend-v1.herokuapp.com/api/v1/admin/orders?limit=${pageData.limit}}&page=${pageData.page}`; // limit=20&page=6
    const { data } = await Axios.get(Endpoint);
    return data;
  };

  return (
    <main className={styles.container}>
    <Navbar title="Orders" />
    <Modal />
    <section>
      <Table tableData={tableData} tableHeader={TableTitle} />
      <Pagination pagination={pagination} setPageData={setPageData} />
    </section>
  </main>
  );
};

export default Orders;


