import React, { useState, useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { useSnackbar } from "notistack";

const AddIncomeForm = ({ setModalIsOpen }) => {
  const [amount, setAmount] = useState("");
  const { dispatch } = useContext(ExpenseContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    
    if(!isNaN(parsedAmount) && parsedAmount > 0){
    dispatch({ type: "ADD_INCOME", payload: parsedAmount });
    enqueueSnackbar("Income Added Successfully", { variant: "success" });
    setAmount("");
    setModalIsOpen(false);
    }else{
      enqueueSnackbar("Please enter a non-negative number or valid number for income", { variant: "error" });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  return (
    <div className="balance-page">
      <p className="heading-balance-page">Add Balance</p>
      <form onSubmit={handleSubmit} className="add-balance-form">
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="balance-input-box"
          placeholder="Income Amount"
          required
        />
<div className="balance-button-container">
        <button type="submit" className="balance-submit-button">Add Balance</button>
        <button onClick={handleCancel} className="balance-cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;
