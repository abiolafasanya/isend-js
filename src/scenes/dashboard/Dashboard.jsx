import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Status from '../../components/Status/Status';
import Table from '../../components/Table/Table';
import Axios from '../../api/axios';
import { useCallback, useEffect, useState } from 'react';
import Pagination from '../Orders/component/pagination';
import Modal from '../../components/Modal/Modal';

const Dashboard = () => {
  const [tableData, setTableData] = useState();
  const [pagination, setPagination] = useState();
  const [pageData, setPageData] = useState({ limit: 5, page: 1 });
  const TableTitle = [
    'date',
    'category',
    'order ID',
    'amount',
    'status',
    'payment',
    'assignee',
    "progress"
  ];

  const getOrder = useCallback(async () => {
    const Endpoint = `/admin/orders?limit=${pageData.limit}}&page=${pageData.page}`; // limit=20&page=6
    const { data } = await Axios.get(Endpoint);
    return data;
  }, [pageData]);

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
    }
    getTableData();

    return () => {
      console.log('cleanup complete');
    };
  }, [getOrder, pageData]);

  return (
    <main className={styles.container}>
      <Navbar title="Dashboard" />
      <Modal />
      <section>
        <Status />
        <Table tableData={tableData} tableHeader={TableTitle} />
        <Pagination pagination={pagination} setPageData={setPageData} />
      </section>
    </main>
  );
};

export default Dashboard;
