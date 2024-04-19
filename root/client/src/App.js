
import './App.css';
import{BrowserRouter as Router,Routes,Route}from "react-router-dom";
import AllEquipment from './components/equipment/AllEquipment';
import Navbar from './components/equipment/Navbar';
import AddEquipment from './components/equipment/AddDamageEquip';
import EditEquipment from './components/equipment/EditEquipment';
import DeleteEquipment from './components/equipment/DeleteEquipment';




function App() {
  return (
    
   
    <Router>
       <Navbar/>
       <Routes>
      
      <Route path='/addEquipment' element={<AddEquipment/>}/>
      <Route path='/editEquipment/:itemno' element={<EditEquipment/> }/>
      <Route path='/delete/:itemno' element={<DeleteEquipment/> }/>
      <Route path='/' element={<AllEquipment/> }/>
     
      </Routes>
    </Router>
    
  );
}



export default App;
