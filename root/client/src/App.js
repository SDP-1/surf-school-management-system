import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./pages/FinancialManagement_Navbar";
import AllTransaction from "./components/FinancialManagement_AllTransaction";
import PaymentGateway from "./pages/FinancialManagement_PaymentGateway";
import Income from "./pages/FinancialManagement_Income";

function App() {
  return (
    // <Router>
    //   <div>
    /* <Heder/> */

    /* <Routes>
          <Route path="/add" exact Component={AddStudent} />
        </Routes> */

    // <Routes>
    //   <Route path="/" exact Component={AllStudent} />
    // </Routes>
    //   </div>
    // </Router>
    <div>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/transaction" exact Component={AllTransaction} />
        </Routes>
        <Routes>
          <Route path="/payment" exact Component={PaymentGateway} />
        </Routes>
        <Routes>
          <Route path="/income" exact Component={Income} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
