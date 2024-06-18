import "./App.css";
import { ExpenseProvider } from "./Context/ExpenseContext";
import { SnackbarProvider } from "notistack";
import Header from "./ExpenseTracker/Header";

function App() {
  return (
    <ExpenseProvider>
      <SnackbarProvider maxSnack={3}>
        <div>
          <Header />
        </div>
      </SnackbarProvider>
    </ExpenseProvider>
  );
}

export default App;
