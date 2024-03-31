import './App.css';

import Header from './components/StaffHeader';
import AllEmployees from './components/AllEmployees';
import AddEmployee from './components/AddEmployee';
import EditEmployees from './components/EditEmployees';
import DeleteEmployees from './components/DeleteEmployees';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() { 
  return (
    <Router>
      <div>
        
      <Header/>
      <Routes>
      <Route path ="/add" exact element={<AddEmployee/>}/>
        </Routes>  
    
        <Routes>
        <Route path ="/" exact element={<AllEmployees/>}/>
          </Routes>  
       
       
          <Routes>
        
        <Route path ="/update/:eid" exact element={<EditEmployees/>}/>
          </Routes>  

          <Routes>
            
            <Route path ="/delete/:eid" exact element={<DeleteEmployees/>}/>
              </Routes>  
    

   
      </div>
    </Router>
  );
}

export default App;
