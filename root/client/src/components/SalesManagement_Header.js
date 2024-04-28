import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function HHeader() {
    const [sale, setSales] = useState([]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#1c4c74' }}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                            <Link to="" className="nav-link active" aria-current="page" style={{ color: '#FFA500' }}> Sales Management </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales/Hdashboard" className="nav-link active" aria-current="page" style={{ color: 'white' }}> Dashboard </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales/rental/all" className="nav-link" style={{ color: 'white' }}>Rental Details</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales/category/:category" className="nav-link" style={{ color: 'white' }}>POS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales/receipts" className="nav-link active" aria-current="page" style={{ color: 'white' }}> Receipts Data </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales/rental/date/:date" className="nav-link active" aria-current="page" style={{ color: 'white' }}>Rental Calendar </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Sales/item" className="nav-link active" aria-current="page" style={{ color: 'white' }}>All Items  </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default HHeader;
