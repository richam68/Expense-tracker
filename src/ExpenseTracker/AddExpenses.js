import React, { useContext, useState } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { useSnackbar } from "notistack";
import {
  FaHamburger,
  FaSchool,
  FaPlane,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { DiAtom } from "react-icons/di";

const AddExpenses = ({ setModalIsOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [showIcons, setShowIcons] = useState(null);
  const { dispatch, state } = useContext(ExpenseContext);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   renderIcon();
  // }, [formData.category]);

  const renderIcon = () => {
    switch (showIcons) {
      case "food":
        return <FaHamburger />;
      case "school":
        return <FaSchool />;
      case "travel":
        return <FaPlane />;
      case "creditCard":
        return <FaRegMoneyBillAlt />;
      default:
        return <DiAtom/>;
    }
  };

  // getnestedValue({a: {b: {c : d: "home"}}}, "a/b/c/d", "default value")
  //closure in details
  //event loops details
  //what are the priorities in event loop
  //
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.toLowerCase().trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      showIcons: showIcons,
    };
    // console.log("new", newExpense)
    dispatch({ type: "ADD_EXPENSE", payload: newExpense });

    if (formData.amount > state.balance) {
      enqueueSnackbar("Wallet balance is Exceed", { variant: "error" });
    } else {
      enqueueSnackbar("Expenses Added Successfully", { variant: "success" });
    }
    setFormData({ title: "", price: "", category: "", date: "" });
    setModalIsOpen(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setModalIsOpen(false);
  };

  return (
    <div className="add-expense-wrapper">
      <p className="heading-balance-page">Add Expenses</p>
      <form onSubmit={handleSubmit} className="expense-html-form">
        <div className="add-expenses-div-division">
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Add Title"
            onChange={handleChange}
            className="expense-input-box"
            required
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            placeholder="Add Price"
            onChange={handleChange}
             className="expense-input-box"
             required
          />
        </div>
        <div className="add-expenses-div-division">
          <div>
            <span>{renderIcon()}</span>
            <input
              type="text"
              name="category"
              value={formData.category}
              placeholder="Add Category"
              onChange={(e) => {
                handleChange(e);
                setShowIcons(e.target.value.toLowerCase());
              }}
               className="expense-input-box"
               required
            />
          </div>
          <input
            type="date"
            name="date"
            value={formData.date}
            placeholder="Add Date"
            onChange={handleChange}
             className="expense-input-box"
             required
          />
        </div>
        <div className="add-expenses-button-div">
          <button type="submit" className="expense-button">Add Expense</button>
          <button onClick={handleCancel} className="expense-cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenses;
