import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function SHeader(){

  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const getSessionData = () => {
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);

    if (data && data.status === "Ref") {
      const leavemanagement = document.getElementById("lv");
      const manage_worksheet = document.getElementById("mw");
      const manage_notices = document.getElementById("mn");
      const attendance_management = document.getElementById("am");
      const salary = document.getElementById("s");
      const All_salary = document.getElementById("as");

      if (leavemanagement) leavemanagement.style.display = "none";
      if (manage_worksheet) manage_worksheet.style.display = "none";
      if (manage_notices) manage_notices.style.display = "none";
      if (attendance_management) attendance_management.style.display = "none";
      if (salary) salary.style.display = "none";
      if (All_salary) All_salary.style.display = "none";

    } else {
      console.log("User data not found in session.");
    }
  }, []);



    const styles = {
      navbar: {
        backgroundColor: "#1c4c74",
        marginTop: "-5px" ,
        marginLeft:'-2px'
      },
      navbarBrand: {
        color: "orange"
      },
      link: {
        color: "white",
        marginRight: "10px"
      }
    };

    return(
        <nav className="navbar navbar-expand-lg" style={styles.navbar}>
          <div className="container-fluid">
            <Link to="/staff/dash" className="navbar-brand" style={styles.navbarBrand}>Staff Management</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
                <li className="nav-item">
                  <Link to="/staff/alle" className="nav-link active" aria-current="page" style={styles.link}>Profile Management</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/request" className="nav-link active" aria-current="page" style={styles.link}>Leave Request</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/requests" className="nav-link active" id="lv" aria-current="page" style={styles.link}>Leave Management</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/w" className="nav-link active" id="mw" aria-current="page" style={styles.link}>Manage Worksheet</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/notices" className="nav-link active" aria-current="page" style={styles.link}>Notices</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/adnotices" className="nav-link active" id="mn" aria-current="page" style={styles.link}>Manage Notices</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/generateQRCode" className="nav-link active" aria-current="page" style={styles.link}>QR Code</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/Attendance" className="nav-link active" id="am" aria-current="page" style={styles.link}>Attendance Management</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/worksheetview" className="nav-link active" aria-current="page" style={styles.link}>Worksheet</Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/staff/addsalary" className="nav-link active" id="s" aria-current="page" style={styles.link}>Salary</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/details" className="nav-link active" id="as" aria-current="page" style={styles.link}>All Salary</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default SHeader;
