/* eslint-disable react/prop-types */
const Pagination = ({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumber.push(i);
  }
  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination">
        {paginationNumber.map((data) => (
          <li className="page-item" key={data}>
            <button
              className={
                currentPage === data ? "btn btn-dark" : "btn btn-secondary"
              }
              onClick={() => handlePagination(data)}
            >
              {data}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Pagination;
