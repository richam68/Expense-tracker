import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import AddExpenses from "./AddExpenses";
import Modal from "react-modal";
import { ExpenseContext } from "../Context/ExpenseContext";

const Expenses = () => {
  const { state } = useContext(ExpenseContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const expenseVal = state.expenses.reduce(
    (total, ele) => total + ele.amount,
    0
  );

  return (
    <div className="d-flex flex-column justify-content-center align-items-center expenses-wrapper">
      <h5 className="text-white">
        Expenses: <span>{expenseVal}</span>
      </h5>
      <Button
        className="expenses-button mt-3"
        onClick={() => setModalIsOpen(true)}
      >
        <FaPlus /> Add Expenses
      </Button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <AddExpenses setModalIsOpen={setModalIsOpen} />
      </Modal>
    </div>
  );
};

export default Expenses;
