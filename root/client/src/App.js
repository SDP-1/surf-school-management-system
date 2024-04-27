
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
import CalendarComponent from './components/EventManagement_Eventcalander';
import CombinedChartsPage from './components/EventManagement_combinedAnalytics';

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


//staff managemnt
import SHeader from './components/StaffManagement_SHeader';
import AddEmployee from './components/StaffManagement_AddEmployee';
//import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import AllEmployees from './components/StaffManagement_AllEmployees';
import EditEmployees from './components/StaffManagement_EditEmployees';
import DeleteEmployees from './components/StaffManagement_DeleteEmployees';
import Staff_WorkSheetAdd from './components/StaffManagement_WorkSheetAdd';
import Staff_AllWorkSheet from './components/StaffManagement_AllWorkSheet';
import LeaveRequestForm from './components/StaffManagement_LeaveRequestForm';
import LeaveDetails from './components/StaffManagement_LeaveDetails';
import AdminLeaveRequests from './components/StaffManagement_AdminLeaveRequests';
import AddNoticeForm from './components/StaffManagement_AddNoticeForm';
import AllNotices from './components/StaffManagement_AllNotices';
import AttendanceQRCode from './components/StaffManagement_AttendanceQRCode';
import AttendanceManager from './components/StaffManagement_AttendanceManager';
import AddAttendance from './components/StaffManagement_AddAttendance';
import Staff_Admin from './components/StaffManagement_Dashboard';
import Staff_AllNotices from './components/StaffManagement_ManageNotices';
import HomePage from './components/StaffManagement_Dashboard';
import Home from "./components/sesAndResManagementSys_Home";
import AddSession from "./components/sesAndResManagementSys_AddSession";
import Sessions from "./components/sesAndResManagementSys_Sessions";
import UpdateSession from "./components/sesAndResManagementSys_UpdateSession";
import AddReservation from "./components/sesAndResManagementSys_AddReservation";
import Reservations from "./components/sesAndResManagementSys_Reservations";
import UpdateReservation from "./components/sesAndResManagementSys_UpdateReservation";

function App() {
  return (

    <Sidebar>
    <Router>

<Routes>
<Route path="/sesAndResManagement" element={<Home />} />
<Route path="/sesAndResManagement/mainhome" element={<Home />} />
<Route path="/sesAndResManagement/addsession" element={<AddSession />} />
<Route path="/sesAndResManagement/sessiondetails" element={<Sessions />} />
<Route path="/sesAndResManagement/sessiondetails/:id" element={<UpdateSession />} />
<Route path="/sesAndResManagement/addreservation" element={<AddReservation />} />
<Route path="/sesAndResManagement/reservationdetails" element={<Reservations />} />
<Route path="/sesAndResManagement/reservationdetails/:id" element={<UpdateReservation />} />
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
    <Route path="/Event/Analytics" element={<CombinedChartsPage />} /> 
    </Routes>

    <Routes>  
    <Route path="/Event/calander" element={<CalendarComponent/>} /> 
    </Routes>

    
    
    
   

    <Routes>  
    <Route path="/Event/*" element={<Footer/>} />      
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



        {/* <Staffmanagement/> */}
        
      
    
        <Routes>
      <Route path ="/staff/*" exact element={<SHeader/>}/>
        </Routes>


      <Routes>
      <Route path ="/staff/dash" exact element={<HomePage/>}/>
        </Routes>  
      <Routes>
      <Route path ="/staff/add" exact element={<AddEmployee/>}/>
        </Routes>  
    
        <Routes>
        <Route path ="/staff/alle" exact element={<AllEmployees/>}/>
          </Routes>  

          <Routes>
        
        <Route path ="/staff/update/:eid" exact element={<EditEmployees/>}/>
          </Routes>  

          <Routes>
            
        <Route path ="/staff/delete/:eid" exact element={<DeleteEmployees/>}/>
          </Routes>  

          
      <Routes>
        
        <Route path ="/staff/addw" exact element={<Staff_WorkSheetAdd/>}/>
          </Routes>  

              
      <Routes>
        
        <Route path ="/staff/w" exact element={<Staff_AllWorkSheet/>}/>
          </Routes> 

               
      <Routes>
        <Route path ="/staff/request" exact element={<LeaveRequestForm/>}/>
          </Routes> 

          <Routes>
        
        <Route path ="/staff/request/:employeeId" exact element={<LeaveDetails/>}/>
          </Routes>

          <Routes>
        <Route path ="/staff/requests" exact element={<AdminLeaveRequests/>}/>
          </Routes> 

          <Routes>
        <Route path ="/staff/notice" exact element={<AddNoticeForm/>}/>
          </Routes> 

      
          <Routes>
        <Route path ="/staff/notices" exact element={<AllNotices/>}/>
          </Routes> 

          <Routes>
        <Route path ="/staff/generateQRCode" exact element={<AttendanceQRCode/>}/>
          </Routes> 

          <Routes>
        <Route path ="/staff/Attendance" exact element={<AttendanceManager/>}/>
          </Routes> 

          <Routes>
        <Route path ="/staff/Attendance/addtt" exact element={<AddAttendance/>}/>
          </Routes> 

          <Routes>
        <Route path ="/staff/adnotices" exact element={<Staff_AllNotices/>}/>
          </Routes>
    
    {/*end*/}
    </Router>
   
    </Sidebar>
  );
}


export default App;
