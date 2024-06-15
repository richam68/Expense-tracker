import React, { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "react-bootstrap";

const TopExpenses = () => {
  const { state } = useContext(ExpenseContext);
  const category = [...new Set(state.expenses.map((ele) => ele.category))];

  const data = category.map((category) => ({
    name: category,
    amount: state.expenses
      .filter((ele) => ele.category === category)
      .reduce((total, ele) => total + ele.amount, 0),
  }));

//   1. Media query - >992px, FOod salary should be correctly aligned
// 2. Media query < 552px: Pie chart should have backdrop grey that is better in height to accomodate
  return (
    <>
    {Boolean(data.length) ?
    <Card className="barchart-card-container" 
    style={{height: 385 }}
    >
      <BarChart width={300} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="amount"
          fill="#8884d8"
          activeBar={{ fill: "pink", stroke: "blue" }}
        />
      </BarChart>
    </Card>
    :  <Card className="barchart-card-container "><h4 style={{color: "#43967B", height: 385}}><i>Kindly Add Expenses, <br/> To see Bar Graph</i></h4></Card>}
    </>
  );
};

export default TopExpenses;
