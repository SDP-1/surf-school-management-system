import './App.css';

import Header from './components/header';
import Addevent from './components/addevent';
import ReadEvents from './components/readevents';
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
    



      </div>
    </Router>
  );
}

export default App;
