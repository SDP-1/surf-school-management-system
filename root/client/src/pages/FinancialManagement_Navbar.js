import React from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import income from "./FinancialManagement_Income";

export default function NavBar() {
  // const [payments, setPayments] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   fetchPayments();
  // }, []);

  // const handleSearch = (e) => {
  //   if (e) {
  //     e.preventDefault();
  //   }

  //   if (!searchQuery) {
  //     fetchPayments();
  //     return;
  //   }

  //   console.log(payments);

  //   const filteredPayments = payments.filter((payment) =>
  //     Object.values(payment).some((field) => {
  //       if (field != null) {
  //         // Check if field is not null or undefined
  //         const fieldValueAsString = field.toString();
  //         return fieldValueAsString
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase());
  //       }
  //       return false; // Skip this field if it's null or undefined
  //     })
  //   );

  //   setPayments(filteredPayments); // Update payments with filtered payments
  //   console.log(filteredPayments);
  //   // }
  // };

  // const fetchPayments = () => {
  //   axios
  //     .get("http://localhost:4000/payment/")
  //     .then((res) => {
  //       setPayments(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Financal Management
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
                  to="/FinancialManagement/dashbord"
                >
                  Dashbord
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/transaction"
                >
                  All Transaction
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Charts
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      chart1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      chart2
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      check it again
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Allert
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/payment"
                >
                  Payment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/FinancialManagement/income"
                >
                  Income
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                // onClick={handleSearch}
              >
                Search
              </button>
            </form>
            {/* <form className="d-flex" onSubmit={handleSearch}>
              <input
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
