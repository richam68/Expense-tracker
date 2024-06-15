import "./App.css";
import { ExpenseProvider } from "./Context/ExpenseContext";
import { SnackbarProvider } from "notistack";
import { Row, Col } from "react-bootstrap";
import Header from "./ExpenseTracker/Header";


function App() {
  return (
    <ExpenseProvider>
      <SnackbarProvider maxSnack={3}>
        {/* <Container className="m-1"> */}
        <div>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          </div>
        {/* </Container> */}
      </SnackbarProvider>
    </ExpenseProvider>
  );
}

export default App;
