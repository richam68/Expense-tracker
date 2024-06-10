import React, { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { ExpenseContext } from "../Context/ExpenseContext";

const EditExpenses = ({
  setModalIsOpen,
  expense,
  setSelectedExpense,
  icons,
  setIcons,
}) => {
  const { dispatch } = useContext(ExpenseContext);

  const [title, setTitle] = useState(expense.title || "");
  const [category, setCategory] = useState(expense.category || "");
  const [amount, setAmount] = useState(expense.amount || "");
  const [date, setDate] = useState(expense.date || "");

  const { enqueueSnackbar } = useSnackbar();

  const handleCancel = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
    setSelectedExpense(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      enqueueSnackbar("Invalid amount", { variant: "error" });
      return;
    }
    const updateExpenses = {
      ...expense,
      title,
      category: icons,
      amount: parsedAmount,
      date,
    };
    // console.log("category", updateExpenses.category)
    // console.log("Original Amount:", expense.amount); // Log original amount
    // console.log("Updated expense:", updateExpenses);
    if(updateExpenses.amount >=0){
    dispatch({
      type: "EDIT_EXPENSES",
      payload: updateExpenses,
      originalAmount: expense.amount,
    });

    enqueueSnackbar("Data edited successfully", { variant: "success" });
    setSelectedExpense(updateExpenses);
    setModalIsOpen(false);
  }else{
    enqueueSnackbar("No negative value is allowed", { variant: "error" });
  }
  };
  return (
    <div className="add-expense-wrapper">
      <p className="heading-balance-page">Edit Expense</p>
      <form onSubmit={handleSubmit} className="expense-html-form">
        <div className="add-expenses-div-division">
          <div>
            <label>Title</label>
            <input
              type="text"
              className="expense-input-box"
              value={title}
              onChange={(e) => setTitle(e.target.value.trim())}
              required
            />
          </div>

          <div>
            <label>Amount</label>
            <input
              type="number"
              className="expense-input-box"
              value={amount}
              onChange={(e) => setAmount(e.target.value.trim())}
              required
            />
          </div>
        </div>

        <div className="add-expenses-div-division">
          <div>
            <label>Category</label>
            <input
              type="text"
              className="expense-input-box"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value.trim());
                setIcons(e.target.value);
              }}
              required
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              className="expense-input-box"
              value={date}
              onChange={(e) => setDate(e.target.value.trim())}
              required
            />
          </div>
        </div>
        <div className="add-expenses-button-div" 
        style={{marginBottom: 12}}>
          <button type="submit" className="expense-button">
            Save Edit
          </button>
          <button onClick={handleCancel} className="expense-cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpenses;
