import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./Context/ExpenseContext";
import { SnackbarProvider } from "notistack";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./ExpenseTracker/Header";


function App() {
  return (
    <ExpenseProvider>
      <SnackbarProvider maxSnack={3}>
        <Container className="mt-3">
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
        </Container>
      </SnackbarProvider>
    </ExpenseProvider>
  );
}

export default App;
