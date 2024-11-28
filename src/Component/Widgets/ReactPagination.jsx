import ReactPaginate from "react-paginate";

const ReactPagination = (pageNumber, pageCount, handlePageSizeChange) => {
  return (
    <ReactPaginate
      previousLabel={
        <button
          type="button"
          className="btn btn-outline-dark"
          aria-label="Previous"
          disabled={pageNumber === 1}
        >
          <span aria-hidden="true">&laquo;</span>
        </button>
      }
      nextLabel={
        <button
          type="button"
          className="btn btn-outline-dark"
          aria-label="Next"
          disabled={pageNumber === pageCount}
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      }
      pageClassName="btn-dark"
      pageLinkClassName="btn btn-outline-dark"
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageSizeChange}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default ReactPagination;
