/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
const styles = {
  dropdownToggle: {
    color: 'white',      // Example: White color for text
    fontWeight: 'bold'
    // add your styles here
  }
};

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">Supplier Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplierDashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/allsup">Supplier</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/allequipment">Inventory</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/damage">Damage Equipment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/equipSup">Surf Board</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/websuits">Web Suits</Link>
            </li>
            {/* <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href=""
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={styles.dropdownToggle}
        >
          Equipment
        </a>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/equip1">Equipment 1</Link></li>
          <li><Link className="dropdown-item" to="/equip2">Equipment 2</Link></li>
          <li><Link className="dropdown-item" to="/equip3">Equipment 3</Link></li>
        </ul>
      </li> */}
      {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Equipment
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/equip1">Equipment 1</Link></li>
                <li><Link className="dropdown-item" to="/equip2">Equipment 2</Link></li>
                <li><Link className="dropdown-item" to="/equip3">Equipment 3</Link></li>
              </ul>
            </li> */}
           
          </ul>
          
        </div>
      </div>
    </nav>
  );
}
