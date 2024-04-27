import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Equipment Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/equipmentHome" && "active"}`} aria-current="page" to="/Equipment_Management/equipmentHome" onClick={() => setCurrentPage("/equipmentHome")}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/" && "active"}`} aria-current="page" to="/Equipment_Management/"onClick={() => setCurrentPage("/")}>Inventory</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/damage" && "active"}`} aria-current="page" to="/Equipment_Management/damage" onClick={() => setCurrentPage("/damage")}>Damage Equipment</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link nav-link-custom ${currentPage === "/Equipment_Management/allReservation" && "active"}`} aria-current="page" to="/Equipment_Management/allReservation" onClick={() => setCurrentPage("/allReservation")}>Equipment Reservation</Link>
            </li>
            
            
           
          </ul>
          
        </div>
      </div>
    </nav>
  );
}