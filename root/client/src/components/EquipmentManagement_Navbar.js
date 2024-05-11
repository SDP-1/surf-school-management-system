import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Define CSS styles as a constant variable
const navbarStyles = {
  backgroundColor: '#1c4c74',
  marginTop: '-5px',
  marginLeft: '-3px',
  color: 'white' // Added text color property
};

export default function Navbar() {
  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyles}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#" style={{ color: 'white' }}>Equipment Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/equipmentHome" && "active"}`} aria-current="page" to="/Equipment_Management/equipmentHome" onClick={() => setCurrentPage("/equipmentHome")} style={{ color: 'white' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/" && "active"}`} aria-current="page" to="/Equipment_Management/" onClick={() => setCurrentPage("/")} style={{ color: 'white' }}>Inventory</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/damage" && "active"}`} aria-current="page" to="/Equipment_Management/damage" onClick={() => setCurrentPage("/damage")} style={{ color: 'white' }}>Damage Equipment</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/allReservation" && "active"}`} aria-current="page" to="/Equipment_Management/allReservation" onClick={() => setCurrentPage("/allReservation")} style={{ color: 'white' }}>Equipment Reservation</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
