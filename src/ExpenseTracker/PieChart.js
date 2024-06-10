import React, { useContext, useMemo } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const PieChartComponent = () => {
  const { state } = useContext(ExpenseContext);

  // Calculate the total amount spent
  const totalAmount = useMemo(() => state.expenses.reduce((acc, expense) => acc + expense.amount, 0), [state.expenses]);

  // Extract unique categories and calculate the percentage value for each category
  const data = useMemo(() => {
    const categories = [...new Set(state.expenses.map((expense) => expense.category))];
    
    return categories.map((category) => {

      const categoryTotal = state.expenses
        .filter((expense) => expense.category === category)
        .reduce((acc, expense) => acc + expense.amount, 0);

      return {
        name: category,
        value: categoryTotal,
        percentage: ((categoryTotal / totalAmount) * 100).toFixed(2),
      };
    });
  }, [state.expenses, totalAmount]);

  // Generate colors for each category
  const COLORS = useMemo(() => data.map((_, i) => `hsl(${(i * 360) / data.length}, 70%, 50%)`), 
  [data.length]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div>

   
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          labelLine={false}
          outerRadius={80}
          fill="green"
          dataKey="value"
          // label={({ name, percentage }) => `${name}: ${percentage}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
        </div>
      <div className="mb-5 d-flex text-white" >
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="d-flex align-items-center">
            <div
              style={{
                width: 30,
                height: 4,
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: 10,
                margin: 5
              }}
            ></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
