/* eslint-disable react/prop-types */
const Pagination = ({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  const totalPages = Math.ceil(length / postsPerPage);
  let paginationNumber = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumber.push(i);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination">
        <button
          className="btn btn-outline-dark"
          aria-label="Previous"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
        {paginationNumber.map((data) => (
          <li className="page-item" key={data}>
            <button
              className={
                currentPage === data ? "btn btn-dark" : "btn btn-outline-dark"
              }
              onClick={() => handlePagination(data)}
            >
              {data}
            </button>
          </li>
        ))}
        <button
          className="btn btn-outline-dark"
          aria-label="Next"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </ul>
    </div>
  );
};
export default Pagination;
