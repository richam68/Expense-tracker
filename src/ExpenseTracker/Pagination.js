import React, { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Pagination = ({ currentPage, paginate, itemPerPage }) => {
  const { state } = useContext(ExpenseContext);
  let totalItemPerPage = state.expenses.length;
  const totalPage = Math.ceil(totalItemPerPage / itemPerPage);

  const paginationButton = () => {
    let collectionOfPage = [];

    //previous button
    collectionOfPage.push(
      <button
        key="previous"
        onClick={() => paginate(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
        disabled={currentPage === 1}
      >
        <FaArrowAltCircleLeft />
      </button>
    );

    for (let page = 1; page <= totalPage; page++) {
      collectionOfPage.push(
        <button
          key={page}
          onClick={() => paginate(page)}
          className={currentPage === page ? "active" : ""}
          style={{backgroundColor: "#43967B"}}
        >
          {page}
        </button>
      );
    }

    collectionOfPage.push(
      <button
        key="next"
        onClick={() => paginate(currentPage + 1)}
        className={currentPage === totalPage ? "disabled" : ""}
        disabled={currentPage === totalPage}
      >
        <FaArrowAltCircleRight />
      </button>
    );
    return collectionOfPage;
  };

  return <div className="pagination">{paginationButton()}</div>;
};

export default Pagination;
