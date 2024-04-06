import "./App.css";

import Header from "./components/eventheader";
import Addevent from "./components/addevent";
import ReadEvents from "./components/readevents";
import DeleteEvents from "./components/deleteEvent";
import UpdateEvent from "./components/updateEvent";
import ReadSingleEvents from "./components/readsingleEvent";
import Footer from "./components/eventfooter";
import TicketPurchaseForm from "./components/eventpurchase";
import InsertTicket from "./components/insertTicketCount";
import SearchView from "./components/eventsearch";
import FreeEvents from "./components/freeEvents";
import CurrentEvents from "./components/currentEvents";
import Reports from "./components/eventReport";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./pages/FinancialManagement_Navbar";
import AllTransaction from "./components/FinancialManagement_AllTransaction";
import PaymentGateway from "./pages/FinancialManagement_PaymentGateway";
import Income from "./pages/FinancialManagement_Income";
import RepostGeanarateCSV from "./components/FinancialManagement_IncomeReportGenaratorCSVFile";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <Sidebar>
      <Router>
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<ReadEvents />} />
        </Routes>

        <Routes>
          <Route path="/addevent" element={<Addevent />} />
        </Routes>

        <Routes>
          <Route path="/getsingleEvent/:Title" element={<ReadSingleEvents />} />
        </Routes>

        <Routes>
          <Route path="/deleteEvent/:Title" element={<DeleteEvents />} />
        </Routes>

        <Routes>
          <Route path="/updateEvent/:Title" element={<UpdateEvent />} />
        </Routes>

        <Routes>
          <Route path="/Purchaseform/:Title" element={<TicketPurchaseForm />} />
        </Routes>

        <Routes>
          <Route
            path="/insertCount/:Title/:ticketCount"
            element={<InsertTicket />}
          />
        </Routes>

        <Routes>
          <Route path="/search" element={<SearchView />} />
        </Routes>

        <Routes>
          <Route path="/freeevents" element={<FreeEvents />} />
        </Routes>

        <Routes>
          <Route path="/currentevents" element={<CurrentEvents />} />
        </Routes>

        <Routes>
          <Route path="/Report" element={<Reports />} />
        </Routes>
        <Routes>
          <Route path="/FinancialManagement/*" exact Component={NavBar} />
        </Routes>
        <Routes>
          <Route
            path="/FinancialManagement/transaction"
            exact
            Component={AllTransaction}
          />
        </Routes>
        <Routes>
          <Route
            path="/FinancialManagement/payment"
            exact
            Component={PaymentGateway}
          />
        </Routes>
        <Routes>
          <Route
            path="/FinancialManagement/income/exportCSV/all"
            exact
            element={<RepostGeanarateCSV data="all" />}
          />
          <Route
            path="/FinancialManagement/income/exportCSV/pending"
            exact
            element={<RepostGeanarateCSV data="pending" />}
          />
          <Route
            path="/FinancialManagement/income/exportCSV/confirm"
            exact
            element={<RepostGeanarateCSV data="confirm" />}
          />
        </Routes>

        <Routes>
          <Route path="/FinancialManagement/income" exact Component={Income} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </Sidebar>
  );
}

export default App;
