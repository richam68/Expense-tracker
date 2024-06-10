import React from "react";
import WalletBalance from "./WalletBalance";
import ExpenseBalance from "./ExpenseBalance";
import PieChartComponent from "./PieChart";
import Transactions from "./Transactions";
import ExpenseTrendsBar from "./ExpenseTrendsBar";

function Header() {

  return (
    <div className="mt-2">
      <h3 className="text-white">Expense Tracker</h3>
      {/* {window.width != '992px' ? className="wrapper " : className="wrapper-break-point" } */}
   
       <div className="wrapper-div-change">
        <div className="wrapper-break-point">
      <WalletBalance />
        <ExpenseBalance />
         </div>
       <PieChartComponent />
      </div>


      <div className="wrapper ">
        <WalletBalance />
        <ExpenseBalance />
        <PieChartComponent />
      </div>

      <div className="header-list-section" style={{ marginTop: "40px" }}>
        <div style={{ flex: 1 }}>
          <h3 className="text-white">Recent Transactions</h3>

          <Transactions />
        </div>
        <div className="top-expense-barchart">
          <h3 className="text-white">Top Expenses</h3>
          <ExpenseTrendsBar />
        </div>
      </div>
    </div>
  );
}

export default Header;
