import "./App.css";
import Header from "./components/EventManagement_eventheader";
import Addevent from "./components/EventManagement_addevent";
import ReadEvents from "./components/EventManagement_readevents";
import DeleteEvents from "./components/EventManagement_deleteEvent";
import UpdateEvent from "./components/EventManagement_updateEvent";
import ReadSingleEvents from "./components/EventManagement_readsingleEvent";
import Footer from "./components/EventManagement_eventfooter";
import TicketPurchaseForm from "./components/EventManagement_eventpurchase";
import InsertTicket from "./components/EventManagement_insertTicketCount";
import SearchView from "./components/EventManagement_eventsearch";
import FreeEvents from "./components/EventManagement_freeEvents";
import CurrentEvents from "./components/EventManagement_currentEvents";
import Reports from "./components/EventManagement_eventReport";
import CalendarComponent from "./components/EventManagement_Eventcalander";
import CombinedChartsPage from "./components/EventManagement_combinedAnalytics";
import Filtersearch from "./components/EventManagement_filtersearch";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./pages/FinancialManagement_Navbar";
import LoginPage from "./components/Login";
import AllTransaction from "./components/FinancialManagement_AllTransaction";
import PaymentGateway from "./pages/FinancialManagement_PaymentGateway";
import Income from "./pages/FinancialManagement_Income";
import Outgoing from "./pages/FinancialManagement_Outgoing";
import IncomeRepostGeanarateCSV from "./components/FinancialManagement_IncomeReportGenaratorCSVFile";
import OutgoingRepostGeanarateCSV from "./components/FinancialManagement_OutgoingReportGenaratorCSVFile";
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/FinancialManagement_Dashboard";

//staff managemnt
import SHeader from "./components/StaffManagement_SHeader";
import AddEmployee from "./components/StaffManagement_AddEmployee";
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
import StaffManagement_WorkSheetView from './components/StaffManagement_WorkSheetView';
import StaffManagement_AddSalary from './components/StaffManagement_AddSalary';

//staff end

import Home from "./components/sesAndResManagementSys_Home";
import AddSession from "./components/sesAndResManagementSys_AddSession";
import Sessions from "./components/sesAndResManagementSys_Sessions";
import UpdateSession from "./components/sesAndResManagementSys_UpdateSession";
import AddReservation from "./components/sesAndResManagementSys_AddReservation";
import Reservations from "./components/sesAndResManagementSys_Reservations";
import UpdateReservation from "./components/sesAndResManagementSys_UpdateReservation";
import StaffManagement_salarydetails from './components/StaffManagement_salarydetails';


//customermanagement
import CustomerManagement_AddCustomer from "./components/CustomerManagement_AddCustomer";
import CustomerManagement_AllCustomers from "./components/CustomerManagement_AllCustomers";
import CustomerManagement_Dashboard from "./components/CustomerManagement_DashBoard";
import CustomerManagement_CustomerTable from "./components/CustomerManagement_CustomerTable";
import CustomerManagement_CHeader from "./components/CustomerManagement_CHeader";
import HHeader from "./components/SalesManagement_Header";
import ItemsAdd from "./components/SalesManagement_ItemsAdd";
import Pos from "./components/SalesManagement_Pos";
import RentalForm from "./components/SalesManagement_RentalForm";
import RentalDetailsTable from "./components/SalesManagement_RentalDetailsTable";
import RentalCalendar from "./components/SalesManagement_RentalCalendar";
import Receipts from "./components/SalesManagement_Receipt";
import HDashboard from "./components/SalesManagement_Salesdashboard";
import Sales_Items from "./components/SalesManagement_SalesItems";
import ExchangeRate from "./pages/FinancialManagement_ExcahangeRatesPage";
import CreateUserPage from "./components/CreateNewUser";
import ShowAllUsers from "./components/ShowAllUsers";
import UserManage from "./pages/UserManagement";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Route for login page */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/" element={<LoginPage />} />

         <Route
          path="/*"
          element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}
          />
         
     </Routes>
    </Router>
  );
}

function ProtectedRoutes({ isLoggedIn }) {
  if (!isLoggedIn) {
    // return <Navigate to="/" />;
    // <Routes>
    //    <Route path="/Event/" element={<ReadEvents />} />
    // </Routes>
  }

  return (
    <Sidebar>
      <Routes>
        <Route path="/sesAndResManagement" element={<Home />} />
        <Route path="/sesAndResManagement/mainhome" element={<Home />} />
        <Route
          path="/sesAndResManagement/addsession"
          element={<AddSession />}
        />
        <Route
          path="/sesAndResManagement/sessiondetails"
          element={<Sessions />}
        />
        <Route
          path="/sesAndResManagement/sessiondetails/:id"
          element={<UpdateSession />}
        />
        <Route
          path="/sesAndResManagement/addreservation"
          element={<AddReservation />}
        />
        <Route
          path="/sesAndResManagement/reservationdetails"
          element={<Reservations />}
        />
        <Route
          path="/sesAndResManagement/reservationdetails/:id"
          element={<UpdateReservation />}
        />
      </Routes>

      <Routes>
        <Route path="/Event/*" element={<Header />} />
      </Routes>

      <Routes>
        <Route path="/Event/" element={<ReadEvents />} />

        <Route path="/Event/addevent" element={<Addevent />} />

        <Route
          path="/Event/getsingleEvent/:Title"
          element={<ReadSingleEvents />}
        />

        <Route path="/Event/deleteEvent/:Title" element={<DeleteEvents />} />

        <Route path="/Event/updateEvent/:Title" element={<UpdateEvent />} />

            <Route
              path="/Event/Purchaseform/:Title/:Price"
              element={<TicketPurchaseForm />}
            />

        <Route
          path="/Event/insertCount/:Title/:ticketCount"
          element={<InsertTicket />}
        />

        <Route path="/Event/search" element={<SearchView />} />

        <Route path="/Event/freeevents" element={<FreeEvents />} />

        <Route path="/Event/currentevents" element={<CurrentEvents />} />

        <Route path="/Event/Report" element={<Reports />} />

        <Route path="/Event/Analytics" element={<CombinedChartsPage />} />
      </Routes>

      <Routes>
        <Route path="/Event/calander" element={<CalendarComponent />} />
      </Routes>

          <Routes>
            <Route path="/Event/filtersearch" element={<Filtersearch/>} />
          </Routes>

          <Routes>
            <Route path="/Event/*" element={<Footer />} />
          </Routes>

      {/* <Routes>
            <Route path="/LoginPage" exact Component={LoginPage} />
          </Routes> */}
      <Routes>
        <Route path="/User/UserManagement" exact Component={UserManage} />
      </Routes>
      <Routes>
        <Route path="/FinancialManagement/*" exact Component={NavBar} />
      </Routes>
      <Routes>
        <Route
          path="/FinancialManagement/dashboard/"
          exact
          Component={Dashboard}
        />

        <Route
          path="/FinancialManagement/exchangeRate"
          exact
          Component={ExchangeRate}
        />

        <Route
          path="/FinancialManagement/transaction"
          exact
          Component={AllTransaction}
        />

        <Route
          path="/FinancialManagement/payment"
          exact
          Component={PaymentGateway}
        />
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
        <Route path="/FinancialManagement/income" exact Component={Income} />
        <Route
          path="/FinancialManagement/outgoing"
          exact
          Component={Outgoing}
        />
      </Routes>

      {/*END of the Finacial Management routers */}

      {/* <Staffmanagement/> */}

      <Routes>
        <Route path="/staff/*" exact element={<SHeader />} />
      </Routes>

      <Routes>
        <Route path="/staff/dash" exact element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/staff/add" exact element={<AddEmployee />} />
      </Routes>

      <Routes>
        <Route path="/staff/alle" exact element={<AllEmployees />} />
      </Routes>

      <Routes>
        <Route path="/staff/update/:eid" exact element={<EditEmployees />} />
      </Routes>

      <Routes>
        <Route path="/staff/delete/:eid" exact element={<DeleteEmployees />} />
      </Routes>

      <Routes>
        <Route path="/staff/addw" exact element={<Staff_WorkSheetAdd />} />
      </Routes>

      <Routes>
        <Route path="/staff/w" exact element={<Staff_AllWorkSheet />} />
      </Routes>

      
      <Routes>
        <Route
          path="/staff/request/:employeeId"
          exact
          element={<LeaveDetails />}
        />
      </Routes>

      <Routes>
        <Route path="/staff/requests" exact element={<AdminLeaveRequests />} />
      </Routes>

      <Routes>
        <Route path="/staff/notice" exact element={<AddNoticeForm />} />
      </Routes>

      <Routes>
        <Route path="/staff/notices" exact element={<AllNotices />} />
      </Routes>

      <Routes>
        <Route
          path="/staff/generateQRCode"
          exact
          element={<AttendanceQRCode />}
        />
      </Routes>

      <Routes>
        <Route path="/staff/Attendance" exact element={<AttendanceManager />} />
      </Routes>

      <Routes>
        <Route
          path="/staff/Attendance/addtt"
          exact
          element={<AddAttendance />}
        />
      </Routes>

      <Routes>
        <Route path="/staff/adnotices" exact element={<Staff_AllNotices />} />
      </Routes>
      
       


        
       
               
      <Routes>
        <Route path ="/staff/request" exact element={<LeaveRequestForm/>}/>
          </Routes> 

        
         
         


          

          <Routes>
        <Route path ="/staff/worksheetview" exact element={<StaffManagement_WorkSheetView/>}/>
          </Routes>

          <Routes>
        <Route path ="/staff/addsalary" exact element={<StaffManagement_AddSalary/>}/>
          </Routes>

          <Routes>
        <Route path ="/staff/details" exact element={<StaffManagement_salarydetails/>}/>
          </Routes>
      {/* /Sales and rental Management */}

      <Routes>
        <Route path="/Sales/*" element={<HHeader />} />
      </Routes>

      <Routes>
        <Route path="/Sales/category/:category" element={<Pos />} />
      </Routes>

      <Routes>
        <Route path="/Sales/add" element={<ItemsAdd />} />
      </Routes>

      <Routes>
        <Route path="/Sales/rental/add" element={<RentalForm />} />
      </Routes>

      <Routes>
        <Route path="/Sales/rental/all" element={<RentalDetailsTable />} />
      </Routes>

      <Routes>
        <Route path="/Sales/rental/date/:date" element={<RentalCalendar />} />
      </Routes>

      <Routes>
        <Route path="/Sales/receipts" element={<Receipts />} />
      </Routes>

      <Routes>
        <Route path="/Sales/Hdashboard" element={<HDashboard />} />
      </Routes>

      <Routes>
        <Route path="/Sales/item" element={<Sales_Items />} />
      </Routes>

      {/*end*/}

      {/*customer management*/}
      <div>
        <Routes>
          <Route path="/customer/*" element={<CustomerManagement_CHeader />} />
        </Routes>

        <Routes>
          <Route
            path="/customer"
            element={<CustomerManagement_AddCustomer />}
          />
        </Routes>

        <Routes>
          <Route
            path="/customer/customers"
            element={<CustomerManagement_AllCustomers />}
          />
        </Routes>

        <Routes>
          <Route
            path="/customer/dashboard"
            element={<CustomerManagement_Dashboard />}
          />
        </Routes>

        <Routes>
          <Route
            path="/customer/table"
            element={<CustomerManagement_CustomerTable />}
          />
        </Routes>



        
      </div>
      {/*end*/}

      {/* <Footer /> */}
    </Sidebar>
  );
}

export default App;
