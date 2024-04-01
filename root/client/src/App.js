import './App.css';

import Header from './components/header';
import Addevent from './components/addevent';
import ReadEvents from './components/readevents';
import DeleteEvents from './components/deleteEvent';
import UpdateEvent from './components/updateEvent';
import ReadSingleEvents from './components/readsingleEvent';
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
    
    
      </div>
    </Router>
  );
}

export default App;
