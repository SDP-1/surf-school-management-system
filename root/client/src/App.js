import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EquipmentManagement_AllEquipment from './components/EquipmentManagement_AllEquipment';
import EquipmentManagement_AddEquipment from './components/EquipmentManagement_AddEquipment';
import EquipmentManagement_EditEquipment from './components/EquipmentManagement_EditEquipment';
import EquipmentManagement_DeleteEquipment from './components/EquipmentManagement_DeleteEquipment';
import EquipmentManagement_AddDamageEquip from './components/EquipmentManagement_AddDamageEquip';
import EquipmentManagement_EditDamageEquip from './components/EquipmentManagement_EditDamageEquip';
import EquipmentManagement_AllDamageEquip from './components/EquipmentManagement_AllDamageEquip';
import EquipmentManagement_DeleteDamageEquip from './components/EquipmentManagement_DeleteDamageEquip';
import EquipmentManagement_TechnicianEmail from './components/EquipmentManagement_TechnicianEmail';
import EquipmentManagement_AddEquipmentReservation from './components/EquipmentManagement_AddEquipmentReservation';
import EquipmentManagement_EditEquipmentReservation from './components/EquipmentManagement_EditEquipmentReservation';
import EquipmentManagement_CancelReservation from './components/EquipmentManagement_CanacelReservation';
import EquipmentManagement_AllEquipmentReservation from './components/EquipmentManagement_AllEquipmentReservation';
import EquipmentManagement_EquipmentHome from './components/EquipmentManagement_EquipmentHome';
import EquipmentManagement_Navbar from './components/EquipmentManagement_Navbar';
function App() {
  return (
    <Router>
      <EquipmentManagement_Navbar />
      
      <Routes>
        <Route path='/addEquipment' element={<EquipmentManagement_AddEquipment />} />
        <Route path='/editEquipment/:equipmentno' element={<EquipmentManagement_EditEquipment />} />
        <Route path='/delete/:equipmentno' element={<EquipmentManagement_DeleteEquipment />} />
        <Route path='/' element={<EquipmentManagement_AllEquipment />} />
        <Route path='/add' element={<EquipmentManagement_AddDamageEquip />} />
        <Route path='/editDamageEquipment/:damageId' element={<EquipmentManagement_EditDamageEquip />} />
        <Route path='/deleteDamage/:damageId' element={<EquipmentManagement_DeleteDamageEquip />} />
        <Route path='/damage' element={<EquipmentManagement_AllDamageEquip />} />
        <Route path='/t' element={<EquipmentManagement_TechnicianEmail />} />
        <Route path='/addReservation' element={<EquipmentManagement_AddEquipmentReservation />} />
        <Route path='/allReservation' element={<EquipmentManagement_AllEquipmentReservation />} />
        <Route path='/editEquipmentReservation/:reservationId' element={<EquipmentManagement_EditEquipmentReservation />} />
        <Route path='/cancelReservation/:reservationId' element={<EquipmentManagement_CancelReservation />} />
        <Route path='/equipmentHome' element={<EquipmentManagement_EquipmentHome />} />
        
      </Routes>
      
      
    </Router>
  );
}

export default App;