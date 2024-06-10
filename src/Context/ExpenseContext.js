import { useEffect, useReducer, createContext } from "react";

const ExpenseContext = createContext();

const initialState = {
  balance: 5000,
  expenses: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      if (state.balance - action.payload.amount < 0) {
        return { ...state, alert: "No Sufficient Balance" };
      }
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        balance: state.balance - action.payload.amount,
      };

    case "ADD_INCOME":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "EDIT_EXPENSES":
      const updateExpenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );

      const originalAmount =
        action.originalAmount !== undefined ? action.originalAmount : 0;
//      console.log(originalAmount);

      const updateBalance =
        state.balance + (originalAmount - action.payload.amount);
      // console.log('Original Amount:', action.originalAmount);
      // console.log('Payload Amount:', action.payload.amount);
      // console.log('Updated Balance:', updateBalance);

      return {
        ...state,
        expenses: updateExpenses,
        balance: updateBalance,
      };

    case "DELETE_EXPENSES":
      const deleteExpense = state.expenses.find(
        (expense) => expense.id === action.payload
      );
      return {
        ...state,
        expenses: state.expenses.filter((ele) => ele.id !== action.payload),
        balance: state.balance + deleteExpense.amount,
      };
      
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
};
const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("expenseState"));
    if (storedState) {
      dispatch({ type: "LOAD_STATE", payload: storedState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenseState", JSON.stringify(state));
  }, [state]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
