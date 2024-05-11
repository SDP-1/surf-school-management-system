import React from "react";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    marginLeft: "-3px", // Left margin
    marginTop: "-5px", // Top margin
    backgroundColor: '#1c4c74', // Change navbar color to orange
  },
  navbarBrand: {
    color: 'white', // Change navbar brand text color to yellow
  },
  navLink: {
    color: 'white', // Change navbar link text color to white
    '&:hover': {
      color: 'gray', // Change navbar link text color on hover to gray
    }
  },
};

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={styles.navbarBrand} to="#">
          Supplier Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                style={styles.navLink}
                aria-current="page"
                to="/supplier/supplierDashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                style={styles.navLink}
                aria-current="page"
                to="/supplier/allsup"
              >
                Supplier
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                style={styles.navLink}
                aria-current="page"
                to="/supplier/allequipment"
              >
                Inventory
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                style={styles.navLink}
                aria-current="page"
                to="/supplier/damage"
              >
                Damage Equipment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                style={styles.navLink}
                aria-current="page"
                to="/supplier/equipSup"
              >
                Surf Board
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                style={styles.navLink}
                aria-current="page"
                to="/supplier/websuits"
              >
                Web Suits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}