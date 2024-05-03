import React from "react";
import { Link } from "react-router-dom";

function SHeader(){
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
                  <Link to="/staff/requests" className="nav-link active" aria-current="page" style={styles.link}>Leave Management</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/w" className="nav-link active" aria-current="page" style={styles.link}>Manage Worksheet</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/notices" className="nav-link active" aria-current="page" style={styles.link}>Notices</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/adnotices" className="nav-link active" aria-current="page" style={styles.link}>Manage Notices</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/generateQRCode" className="nav-link active" aria-current="page" style={styles.link}>QR Code</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/Attendance" className="nav-link active" aria-current="page" style={styles.link}>Attendance Management</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/worksheetview" className="nav-link active" aria-current="page" style={styles.link}>Worksheet</Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/staff/addsalary" className="nav-link active" aria-current="page" style={styles.link}>Salary</Link>
                </li>
                <li className="nav-item">
                  <Link to="/staff/details" className="nav-link active" aria-current="page" style={styles.link}>All Salary</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
};

export default SHeader;
