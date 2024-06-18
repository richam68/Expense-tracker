import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { ExpenseContext } from "../Context/ExpenseContext";
import Modal from "react-modal";
import AddIncomeForm from "./AddIncomeForm";

const WalletBalance = () => {
  const { state } = useContext(ExpenseContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center wallet-container">
      <h5 className="text-white">
        Wallet Balance: <span>${state.balance}</span>
      </h5>

      <Button
        className="wallet-button mt-3"
        onClick={() => setModalIsOpen(true)}
      >
        <FaPlus /> Add Income
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{ opacity: "50 !important" }}
      >
        <AddIncomeForm setModalIsOpen={setModalIsOpen} />
      </Modal>
    </div>
  );
};

export default WalletBalance;
