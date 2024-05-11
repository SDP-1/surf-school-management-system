import React from "react";
import { Link } from "react-router-dom";

const navStyles = {
  navbar: {
    backgroundColor: '#1c4c74',
    color: 'white',
    marginTop: '-5px', // Adjust margin top as needed
    marginLeft: '-2px',
    // position: 'fixed', // Add this line
    // top: '0', // Add this line
    marginBottom: '10px', // Adjust margin left as needed
  },
  brand: {
    color: 'white'
  },
  searchInput: {
    backgroundColor: 'white',
    color: '#1c4c74',
  }
};

export default function NavBar() {
  return (
      <nav className="navbar navbar-expand-lg" style={navStyles.navbar}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="#" style={navStyles.brand}>
            Financial Management
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
                  aria-current="page"
                  to="/FinancialManagement/dashboard"
                  style={navStyles.brand}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/exchangeRate"
                  style={navStyles.brand}
                >
                  Exchange Rate
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/transaction"
                  style={navStyles.brand}
                >
                  All Transaction
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={navStyles.brand}
                >
                  Charts
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" style={navStyles.brand}>
                      Chart1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" style={navStyles.brand}>
                      Chart2
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" style={navStyles.brand}>
                      Check it Again
                    </a>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="#"
                  style={navStyles.brand}
                >
                  Alert
                </Link>
              </li>
              <li className="nav-item">
                {/* <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/payment"
                  style={navStyles.brand}
                >
                  Payment
                </Link> */}
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/income"
                  style={navStyles.brand}
                >
                  Income
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/outgoing"
                  style={navStyles.brand}
                >
                  Outgoing
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={navStyles.searchInput}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
  );
}
