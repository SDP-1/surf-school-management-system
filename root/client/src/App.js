import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/sesAndResManagementSys_Home";
import AddSession from "./components/sesAndResManagementSys_AddSession";
import Sessions from "./components/sesAndResManagementSys_Sessions";
import UpdateSession from "./components/sesAndResManagementSys_UpdateSession";
import AddReservation from "./components/sesAndResManagementSys_AddReservation";
import Reservations from "./components/sesAndResManagementSys_Reservations";
import UpdateReservation from "./components/sesAndResManagementSys_UpdateReservation";

function App() {
  return (
    <Router>
      <div>
        <React.Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mainhome" element={<Home />} />
            <Route path="/addsession" element={<AddSession />} />
            <Route path="/sessiondetails" element={<Sessions />} />
            <Route path="/sessiondetails/:id" element={<UpdateSession />} />
            <Route path="/addreservation" element={<AddReservation />} />
            <Route path="/reservationdetails" element={<Reservations />} />
            <Route path="/reservationdetails/:id" element={<UpdateReservation />} />
          </Routes>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;
