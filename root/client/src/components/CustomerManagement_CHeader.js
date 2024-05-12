import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function CHeader() {
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-lightblue" style={{ backgroundColor: '#1c4c74', color: 'white' }}> {/* Added bg-lightblue class */}
      <div className="container-fluid">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link to="/customer/dashboard" className="nav-link active" aria-current="page">Customer Management </Link>
            </li>

            <li className="nav-item">
              <Link to="/customer/customers" className="nav-link active" aria-current="page">All Customer </Link>
            </li>

            <li className="nav-item">
              <Link to="/customer/table" className="nav-link active" aria-current="page">Customer Table </Link>
            </li>
            <li className="nav-item">
              <Link to="/customer/offers" className="nav-link active" aria-current="page">Offer Details </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  )
}

export default CHeader;
