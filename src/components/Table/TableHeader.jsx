import styles from './table.module.css';

const TableHeader = ({ title }) => {
  return <th className={styles.header}>{title}</th>;
};

export default TableHeader;
