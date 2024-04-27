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
        <Route path='/Equipment_Management/addEquipment' element={<EquipmentManagement_AddEquipment />} />
        <Route path='/Equipment_Management/editEquipment/:equipmentno' element={<EquipmentManagement_EditEquipment />} />
        <Route path='/Equipment_Management/delete/:equipmentno' element={<EquipmentManagement_DeleteEquipment />} />
        <Route path='/Equipment_Management/' element={<EquipmentManagement_AllEquipment />} />
        <Route path='/Equipment_Management/add' element={<EquipmentManagement_AddDamageEquip />} />
        <Route path='/Equipment_Management/editDamageEquipment/:damageId' element={<EquipmentManagement_EditDamageEquip />} />
        <Route path='/Equipment_Management/deleteDamage/:damageId' element={<EquipmentManagement_DeleteDamageEquip />} />
        <Route path='/Equipment_Management/damage' element={<EquipmentManagement_AllDamageEquip />} />
        <Route path='/Equipment_Management/t' element={<EquipmentManagement_TechnicianEmail />} />
        <Route path='/Equipment_Management/addReservation' element={<EquipmentManagement_AddEquipmentReservation />} />
        <Route path='/Equipment_Management/allReservation' element={<EquipmentManagement_AllEquipmentReservation />} />
        <Route path='/Equipment_Management/editEquipmentReservation/:reservationId' element={<EquipmentManagement_EditEquipmentReservation />} />
        <Route path='/Equipment_Management/cancelReservation/:reservationId' element={<EquipmentManagement_CancelReservation />} />
        <Route path='/Equipment_Management/equipmentHome' element={<EquipmentManagement_EquipmentHome />} />
        
      </Routes>
      
      
    </Router>
  );
}

export default App;