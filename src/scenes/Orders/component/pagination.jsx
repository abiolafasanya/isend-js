import styles from './paginate.module.css';

const Pagination = ({ pagination, setPageData }) => {

  const prevPage = () => {

    if (pagination?.currentPage > 1) {
      pagination.currentPage--;
      setPageData((data) => {
        const currentPage = { limit: data.limit, page: pagination.currentPage };
        return currentPage;
      });
      console.log('Current Page:', pagination.currentPage);
    } else {
      console.log('You are already on the first page.');
    }
  };

  const nextPage = () => {
    if (pagination?.currentPage < pagination?.totalPages) {
      pagination.currentPage++;
      setPageData((data) => {
        const currentPage = { limit: data.limit, page: pagination.currentPage };
        return currentPage;
      });
      console.log('Current Page:', pagination.currentPage);
    } else {
      console.log('You are already on the last page.');
    }
  };

  const handleLimitChange = (
    event
  ) => {
    // Handle select element value change
    const limit = parseInt(event.target.value);
    setPageData((data) => {
      const currentPage = { ...data, limit: limit };
      return currentPage;
    });
    console.log(`Limit: ${limit}`);
  };

  
    return (
      <div className={styles.pagination}>
        <div className={styles.limit}>
          <label htmlFor="limit">Limit</label>
          <select name="limit" id="limit" defaultValue={5} onChange={handleLimitChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div>
            <span>{}</span>
            <span>{}</span>
            <span>{}</span>
          </div>
        </div>
        <div className={styles.btn_group}>
          <button onClick={prevPage}>Prev</button>
          <span>{pagination?.currentPage}</span>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  