/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
// const styles = {
//   dropdownToggle: {
//     color: 'white',      // Example: White color for text
//     fontWeight: 'bold'
//     // add your styles here
//   }
// };

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#1c4c74" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#" style={{ color: "white" }}>Supplier Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplier/supplierDashboard" style={{ color: "white" }}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplier/allsup" style={{ color: "white" }}>Supplier</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplier/allequipment" style={{ color: "white" }}>Inventory</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplier/damage" style={{ color: "white" }}>Damage Equipment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplier/equipSup" style={{ color: "white" }}>Surf Board</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/supplier/websuits" style={{ color: "white" }}>Web Suits</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
