<<<<<<< HEAD
import './App.css';
import Header from './components/EventManagement_eventheader';
import Addevent from './components/EventManagement_addevent';
import ReadEvents from './components/EventManagement_readevents';
import DeleteEvents from './components/EventManagement_deleteEvent';
import UpdateEvent from './components/EventManagement_updateEvent';
import ReadSingleEvents from './components/EventManagement_readsingleEvent';
import Footer from './components/EventManagement_eventfooter';
import TicketPurchaseForm from './components/EventManagement_eventpurchase';
import InsertTicket from './components/EventManagement_insertTicketCount';
import SearchView from './components/EventManagement_eventsearch';
import FreeEvents from './components/EventManagement_freeEvents';
import CurrentEvents from './components/EventManagement_currentEvents';
import Reports from './components/EventManagement_eventReport';
import SideBar from './components/SideBar';
import Analytics from './components/EventManagement_EventAnalytics';
import CalendarComponent from './components/EventManagement_Eventcalander';
=======
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
>>>>>>> 8e71274ac7da344a3faa466ae7539f0abc7bd3fc
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./pages/FinancialManagement_Navbar";
import AllTransaction from "./components/FinancialManagement_AllTransaction";
import PaymentGateway from "./pages/FinancialManagement_PaymentGateway";
import Income from "./pages/FinancialManagement_Income";

function App() {
  return (
<<<<<<< HEAD
    <SideBar>
    <Router>
      {/* <div> */}
    
    

    <Routes>  
    <Route path="/Event/*" element={<Header/>} />      
    </Routes>
    

    <Routes>  
    <Route path="/Event/" element={<ReadEvents/>} />      
    </Routes>
 
        
    <Routes>
    <Route path="/Event/addevent" element={<Addevent />} />
    </Routes>
    
    <Routes>  
    <Route path="/Event/getsingleEvent/:Title" element={<ReadSingleEvents />} /> 
    </Routes>

    <Routes>  
    <Route path="/Event/deleteEvent/:Title" element={<DeleteEvents />} /> 
    </Routes>

    <Routes>  
    <Route path="/Event/updateEvent/:Title" element={<UpdateEvent />} /> 
    </Routes>
    
    <Routes>  
    <Route path="/Event/Purchaseform/:Title" element={<TicketPurchaseForm />} /> 
    </Routes>
    
    <Routes>  
    <Route path="/Event/insertCount/:Title/:ticketCount" element={<InsertTicket/>} />
    </Routes>
    
    <Routes>  
    <Route path="/Event/search" element={<SearchView />} /> 
    </Routes>

    <Routes>  
    <Route path="/Event/freeevents" element={<FreeEvents />} /> 
    </Routes>
    
    <Routes>  
    <Route path="/Event/currentevents" element={<CurrentEvents />} /> 
    </Routes>
     

    <Routes>  
    <Route path="/Event/Report" element={<Reports />} /> 
    </Routes>

    <Routes>  
    <Route path="/Event/Analytics" element={<Analytics />} /> 
    </Routes>

    <Routes>  
    <Route path="/Event/calander" element={<CalendarComponent/>} /> 
    </Routes>



    <Footer/>
      {/* </div> */}
    </Router>
   
    </SideBar>
=======
    <div>
      <Router>
        <NavBar />
        <Header />

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
          <Route path="/transaction" exact Component={AllTransaction} />
        </Routes>
        <Routes>
          <Route path="/payment" exact Component={PaymentGateway} />
        </Routes>
        <Routes>
          <Route path="/income" exact Component={Income} />
        </Routes>

        <Footer />
      </Router>
    </div>
>>>>>>> 8e71274ac7da344a3faa466ae7539f0abc7bd3fc
  );
}

export default App;
