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
import Outgoing from "./pages/FinancialManagement_Outgoing";
import IncomeRepostGeanarateCSV from "./components/FinancialManagement_IncomeReportGenaratorCSVFile";
import OutgoingRepostGeanarateCSV from "./components/FinancialManagement_OutgoingReportGenaratorCSVFile";
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/FinancialManagement_Dashboard";

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

        {/* Finacial Management routers */}
        {/* <Routes>
          <Route path="/dashboard/*" exact Component={Dashboard} />
        </Routes> */}
        <Routes>
          <Route path="/FinancialManagement/*" exact Component={NavBar} />
        </Routes>
        <Routes>
          <Route path="/FinancialManagement/dashboard/*" exact Component={Dashboard} />
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
            element={<IncomeRepostGeanarateCSV data="all" />}
          />
          <Route
            path="/FinancialManagement/income/exportCSV/pending"
            exact
            element={<IncomeRepostGeanarateCSV data="pending" />}
          />
          <Route
            path="/FinancialManagement/income/exportCSV/confirm"
            exact
            element={<IncomeRepostGeanarateCSV data="confirm" />}
          />
        </Routes>

        <Routes>
          <Route
            path="/FinancialManagement/outcome/exportCSV/all"
            exact
            element={<OutgoingRepostGeanarateCSV data="all" />}
          />
          <Route
            path="/FinancialManagement/outcome/exportCSV/pending"
            exact
            element={<OutgoingRepostGeanarateCSV data="pending" />}
          />
          <Route
            path="/FinancialManagement/outcome/exportCSV/confirm"
            exact
            element={<OutgoingRepostGeanarateCSV data="confirm" />}
          />
        </Routes>

        <Routes>
          <Route path="/FinancialManagement/income" exact Component={Income} />
        </Routes>
        <Routes>
          <Route
            path="/FinancialManagement/outgoing"
            exact
            Component={Outgoing}
          />
        </Routes>

        {/*END of the Finacial Management routers */}

        {/* <Footer /> */}
      </Router>
    </Sidebar>
  );
}

export default App;
