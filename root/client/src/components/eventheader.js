// Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search query as a URL parameter
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
      <a className="navbar-brand" href="#" style={{ color: "orange" }}>Surfing Events</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/addevent" className="nav-link active" aria-current="page">Add Event</Link>
            </li>
            <li className="nav-item">
              <Link to="/Report" className="nav-link active" aria-current="page">Reports</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          
            <div className="dropdown" style={{ marginRight: '20px' }}>  
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              Filter
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton"  >
              <li className="p-3">
                <form onSubmit={handleSearch}>
                  <div className="mb-3">
                    <label htmlFor="locationInput" className="form-label">Location</label>
                    <input 
                      id="locationInput"
                      className="form-control" 
                      type="text" 
                      placeholder="Enter Location" 
                      
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="timeInput" className="form-label">Time</label>
                    <input 
                      id="timeInput"
                      className="form-control" 
                      type="text" 
                      placeholder="Enter Time" 
                    
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dateInput" className="form-label">Date</label>
                    <input 
                      id="dateInput"
                      className="form-control" 
                      type="text" 
                      placeholder="Enter Date" 
                    
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">Search</button>
                </form>
              </li>
            </ul>
          </div>

          
          <form className="d-flex" onSubmit={handleSearch} role="search" aria-label="Site search">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
