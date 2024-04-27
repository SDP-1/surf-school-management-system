import {Link} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
function HHeader ()
{
  const[sale, setSales] = useState([]);
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

      <li className="nav-item">
          <Link to="/Sales/Hdashboard" className="nav-link active" aria-current="page"> Dashboard </Link>
        </li>
       
        <li className="nav-item">
          <Link to="/Sales/rental/all" className="nav-link">Rental Details</Link>
        </li>

        <li className="nav-item">
          <Link to="/Sales/category/:category" className="nav-link">POS</Link>
        </li>
        <li className="nav-item">
          <Link to="/Sales/receipts" className="nav-link active" aria-current="page"> Receipts Data </Link>
        </li>

        <li className="nav-item">
          <Link to="/Sales/rental/date/:date"className="nav-link active" aria-current="page">Rental Calendar </Link>
        </li>
       
        <li className="nav-item">
          <Link to="/Sales/item"className="nav-link active" aria-current="page">All Items  </Link>
        </li>
      </ul>
     
    </div>
  </div>
</nav>

       
    )
}

export default HHeader;