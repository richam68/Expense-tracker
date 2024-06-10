import React, { useState, useContext } from "react";
import Modal from "react-modal";
import {
  FaEdit,
  FaTrash,
  FaHamburger,
  FaSchool,
  FaPlane,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { DiAtom } from "react-icons/di";
import { Card } from "react-bootstrap";
import { ExpenseContext } from "../Context/ExpenseContext";
import EditExpenses from "./EditExpenses";
import Pagination from "./Pagination";

const Transactions = () => {
  const { state, dispatch } = useContext(ExpenseContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [icons, setIcons] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function renderIcon(icons) {
    if (icons === "food") {
      return <FaHamburger />;
    } else if (icons === "school") {
      return <FaSchool />;
    } else if (icons === "travel") {
      return <FaPlane />;
    } else if (icons === "creditCard") {
      return <FaRegMoneyBillAlt />;
    } else {
      return <DiAtom />;
    }
  }

  const itemPerPage = 3;
  let indexOfLastPerPage = currentPage * itemPerPage;
  let indexOfFirstPage = indexOfLastPerPage - itemPerPage;
  const currentItems = state.expenses.slice(
    indexOfFirstPage,
    indexOfLastPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setModalIsOpen(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_EXPENSES", payload: id });
  };

  return (
    <Card
      style={{
        height: "400px",
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "rgba(0, 0, 0, 0.25)",
        borderRadius: 15,
      }}
    >
      <Card.Body>
        <>
          {currentItems.map((expense) => {
            return (
              <>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                  <div style={{ display: "flex", gap: 5}}>
                  <div key={expense.id} className="expense-list-icon">
                    {/*{expense.showIcons} */}
                    {renderIcon(expense.category)}
                  </div>


                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{color: "#000000", fontSize: 16, fontWeight: 400}}>{expense.title}</div>

                    <div>
                      <Card.Title
                        style={{
                         color: "#9B9B9B",
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      ></Card.Title>
                      <Card.Text
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: 16,
                          color: "rgba(155, 155, 155, 1)",
                          fontWeight: 400,
                        }}
                      >
                        {expense.date}
                      </Card.Text>
                    </div>
                  </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <Card.Title
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: 16,
                        color: "rgba(244, 187, 74, 1)",
                        fontWeight: 700,
                      }}
                    >
                      {expense.amount}
                    </Card.Title>

                    <button
                      style={{
                        backgroundColor: "#FF3E3E",
                        border: "none",
                        borderRadius: 15,
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "rgba(255, 255, 255, 1)",
                      }}
                      onClick={() => handleEdit(expense)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      style={{
                        backgroundColor: "#FF3E3E",
                        border: "none",
                        borderRadius: 15,
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "rgba(255, 255, 255, 1)",
                      }}
                      onClick={() => handleDelete(expense.id)}
                    >
                      <FaTrash
                        style={{
                          boxShadow: "rgba(255, 255, 255, 1)",
                          borderRadius: 15,
                        }}
                      />
                    </button>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
          {Boolean(currentItems.length) ? (
            <Pagination
              currentPage={currentPage}
              paginate={paginate}
              itemPerPage={itemPerPage}
            />
          ) : (
            <h4 style={{color: "#43967B"}}><i>Kindly Add Expenses, <br/> To see Expense List</i></h4>
          )}
        </>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          // style={{
          //   overlay: {
          //     backgroundColor: 'rgba(0, 0, 0, 0) !important'
          //   },
          // }}
        >
          {selectedExpense && (
            <EditExpenses
              setModalIsOpen={setModalIsOpen}
              expense={selectedExpense}
              setSelectedExpense={setSelectedExpense}
              icons={icons}
              setIcons={setIcons}
            />
          )}
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Transactions;
