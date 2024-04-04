import './App.css';

import AddStudent from './components/AddStudent';
import Heder from './components/Heder';
import AllStudent from './components/AlllStudent';

import Header from './components/eventheader';
import Addevent from './components/addevent';
import ReadEvents from './components/readevents';
import DeleteEvents from './components/deleteEvent';
import UpdateEvent from './components/updateEvent';
import ReadSingleEvents from './components/readsingleEvent';
import Footer from './components/eventfooter';
import TicketPurchaseForm from './components/eventpurchase';
import InsertTicket from './components/insertTicketCount';
import SearchView from './components/eventsearch';
import FreeEvents from './components/freeEvents';
import CurrentEvents from './components/currentEvents';
import Reports from './components/eventReport';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() { 
  return (
    <Router>
      <div>
    <Header/>

    <Routes>  
    <Route path="/" element={<ReadEvents/>} />      
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
    <Route path="/insertCount/:Title/:ticketCount" element={<InsertTicket/>} />
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

    <Footer/>
      </div>
    </Router>
  );
}

export default App;
