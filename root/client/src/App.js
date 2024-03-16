import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./pages/Navbar";
import AllTransaction from "./components/AllTransaction";
import PaymentGateway from "./pages/PaymentGateway";

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
          <Route path="/" exact Component={AllTransaction} />
        </Routes>
        <Routes>
          <Route path="/payment" exact Component={PaymentGateway} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
