import styles from './Dashboard.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Status from '../../components/Status/Status';
import Table from '../../components/Table/Table';
import Axios from '../../api/axios';
import { useEffect, useState } from 'react';
import Pagination from '../Orders/component/pagination';
import Modal from '../../components/Modal/Modal';
import useApp from '../../hooks/useApp';

const Dashboard = () => {
  const [tableData, setTableData] = useState();
  const [pagination, setPagination] = useState();
  const [pageData, setPageData] = useState({ limit: 10, page: 1 });
  const { events, auth } = useApp();
  const TableTitle = [
    'date',
    'category',
    'order ID',
    'amount',
    'status',
    'payment',
    'assignee',
    'progress',
  ];

  useEffect(() => {
    async function getTableData() {
      try {
        const Endpoint = `/admin/orders?limit=${pageData.limit}}&page=${pageData.page}`; // limit=20&page=6
        const { data } = await Axios.get(Endpoint);

        // sort order by date descending using updatedAt timestamp
        const sortByDesc = data.order.sort(function (a, b) {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        setTableData(sortByDesc);
        setPagination(data.pagination);
        // console.log(events);
      } catch (error) {
        console.log('Error getting order data:', error.message);
      }
    }

    getTableData().then((data) => data);

  }, [pageData, events, auth]);

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
