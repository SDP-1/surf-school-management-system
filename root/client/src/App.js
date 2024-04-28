
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
import Analytics from './components/EventManagement_EventAnalytics';
import CalendarComponent from './components/EventManagement_Eventcalander';

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

import SupplierManagement_AllEquipment from './components/SupplierManagement_AllEquipment';
import SupplierManagement_Navbar from './components/SupplierManagement_Navbar';
import SupplierManagement_AddSupplier from './components/SupplierManagement_AddSupplier';
import SupplierManagement_AllSupplier from './components/SupplierManagement_AllSupplier';
import SupplierManagement_DeleteSupplier from './components/SupplierManagement_DeleteSupplier';
import SupplierManagement_UpdateSupplier from './components/SupplierManagement_UpdateSupplier';
import SupplierManagement_Websuits from './components/SupplierManagement_Websuits';
import SupplierManagement_SupplierEquipSurfboard from'./components/SupplierManagement_SupplierEquipSurfboard';
 import SupplierManagement_AddEquipment from './components/SupplierManagement_AddEquipment';
 import SupplierManagement_EditEquipment from './components/SupplierManagement_EditEquipment';
 import SupplierManagement_DeleteEquipment from './components/SupplierManagement_DeleteEquipment';
 import SupplierManagement_AddDamageEquip from './components/SupplierManagement_AddDamageEquip';
 import SupplierManagement_EditDamageEquip from './components/SupplierManagement_EditDamageEquip';
 import SupplierManagement_AllDamageEquip from './components/SupplierManagement_AllDamageEquip';
 import SupplierManagement_DeleteDamageEquip from './components/SupplierManagement_DeleteDamageEquip';
 import SupplierManagement_SupplierEmail from './components/SupplierManagement_SupplierEmail';
 import SupplierManagement_Dashboard from './components/SupplierManagement_Dashboard';

function App() {
  return (

    <Sidebar>
    <Router>
      

    <Routes>  
    <Route path="/supplier/*" element={<SupplierManagement_Navbar/>} />      
    </Routes>

    <Routes>  
    <Route path="/supplier/supplierDashboard" element={<SupplierManagement_Dashboard/>} />      
    </Routes>

    <Routes>  
    <Route path='/supplier/addEquipment' element={<SupplierManagement_AddEquipment />} />      
    </Routes>

    <Routes>  
    <Route path='/supplier/editEquipment/:equipmentno' element={<SupplierManagement_EditEquipment />} />   
    </Routes>

    <Routes>  
    <Route path='/supplier/delete/:equipmentno' element={<SupplierManagement_DeleteEquipment />} />
    </Routes>

    <Routes>  
    <Route path='/supplier/allequipment' element={<SupplierManagement_AllEquipment />} /> 
    </Routes>

    <Routes>  
    <Route path='/supplier/add' element={<SupplierManagement_AddDamageEquip />} />  
    </Routes>

    <Routes>  
    <Route path='/supplier/editDamageEquipment/:damageId' element={<SupplierManagement_EditDamageEquip />} />  
    </Routes>

    <Routes>  
    <Route path='/supplier/deleteDamage/:damageId' element={<SupplierManagement_DeleteDamageEquip />} />   
    </Routes>

    <Routes>  
    <Route path='/supplier/damage' element={<SupplierManagement_AllDamageEquip />} />  
    </Routes>

    <Routes>  
    <Route path='/supplier/t' element={<SupplierManagement_SupplierEmail />} />   
    </Routes>

    <Routes>  
    <Route path='/supplier/supupdate/:suppliercode' element={<SupplierManagement_UpdateSupplier />} /> 
    </Routes>

    <Routes>  
    <Route path='/supplier/supplierdelete/:suppliercode' element={<SupplierManagement_DeleteSupplier />} /> 
    </Routes>

    <Routes>  
    <Route path='/supplier/addsup' element={<SupplierManagement_AddSupplier />} />  
    </Routes>

    <Routes>  
    <Route path='/supplier/allsup' element={<SupplierManagement_AllSupplier />} /> 
    </Routes>

    <Routes>  
    <Route path='/supplier/equipSup' element={<SupplierManagement_SupplierEquipSurfboard />} />  
    </Routes>

    <Routes>  
    <Route path='/supplier/websuits' element={<SupplierManagement_Websuits />} />   
    </Routes>


   



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


        {/* <Routes>  
    <Route path="/supplierDashboard" element={</SupplierManagement_Dashboard>} />      
    </Routes> */}
      </Router>
    </Sidebar>
  );
}

export default App;
