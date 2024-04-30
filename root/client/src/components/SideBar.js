import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";

function SideBar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const styles = `
  /* Google Font Link */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins" , sans-serif;
  }
  .sidebar{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 78px;
    // background: #11101D;
    background: #1c4c74;
    padding: 6px 14px;
    z-index: 99;
    transition: all 0.5s ease;
  }
  .sidebar.open{
    width: 250px;
  }
  .sidebar .logo-details{
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .sidebar .logo-details .icon{
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar .logo-details .logo_name{
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details .icon,
  .sidebar.open .logo-details .logo_name{
    opacity: 1;
  }
  .sidebar .logo-details #btn{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-size: 22px;
    transition: all 0.4s ease;
    font-size: 23px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s ease;
  }
  .sidebar.open .logo-details #btn{
    text-align: right;
  }
  .sidebar i{
    color: #fff;
    height: 60px;
    min-width: 50px;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
  }
  .sidebar .nav-list{
    margin-left : -30px;
    margin-top: 20px;
    height: 100%;
  }
  .sidebar li{
    position: relative;
    margin: 8px 0;
    list-style: none;
  }
  .sidebar li .tooltip{
    position: absolute;
    top: -20px;
    left: calc(100% + 15px);
    z-index: 3;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    opacity: 0;
    white-space: nowrap;
    pointer-events: none;
    transition: 0s;
  }
  .sidebar li:hover .tooltip{
    opacity: 1;
    pointer-events: auto;
    transition: all 0.4s ease;
    top: 50%;
    transform: translateY(-50%);
  }
  .sidebar.open li .tooltip{
    display: none;
  }
  .sidebar input{
    font-size: 15px;
    color: #FFF;
    font-weight: 400;
    outline: none;
    height: 50px;
    width: 100%;
    width: 50px;
    border: none;
    border-radius: 12px;
    transition: all 0.5s ease;
    background: #0b3659;
  }
  .sidebar.open input{
    padding: 0 20px 0 50px;
    width: 100%;
  }
  .sidebar .bx-search{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 22px;
    background: #0b3659;
    color: #FFF;
  }
  .sidebar.open .bx-search:hover{
    background: #0b3659;
    color: #FFF;
  }
  .sidebar .bx-search:hover{
    background: #FFF;
    color: #11101d;
  }
  .sidebar li a{
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    background: #0b3659;
  }
  .sidebar li a:hover{
    background: #FFF;
  }
  .sidebar li a .links_name{
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: 0.4s;
  }
  .sidebar.open li a .links_name{
    opacity: 1;
    pointer-events: auto;
  }
  .sidebar li a:hover .links_name,
  .sidebar li a:hover i{
    transition: all 0.5s ease;
    color: #11101D;
  }
  .sidebar li i{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    border-radius: 12px;
  }
  .sidebar li.profile{
    position: fixed;
    height: 60px;
    width: 78px;
    left: 0;
    bottom: -8px;
    padding: 10px 14px;
    background: #0b3659;
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .sidebar.open li.profile{
    width: 250px;
  }
  .sidebar li .profile-details{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .sidebar li img{
    height: 45px;
    width: 45px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 10px;
  }
  .sidebar li.profile .name,
  .sidebar li.profile .job{
    font-size: 15px;
    font-weight: 400;
    color: #fff;
    white-space: nowrap;
  }
  .sidebar li.profile .job{
    font-size: 12px;
  }
  .sidebar .profile #log_out{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background: #0b3659;
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-radius: 0px;
    transition: all 0.5s ease;
  }
  .sidebar.open .profile #log_out{
    width: 50px;
    background: none;
  }
  .home-section{
    position: relative;
    background: #E4E9F7;
    min-height: 100vh;
    top: 0;
    left: 78px;
    width: calc(100% - 78px);
    transition: all 0.5s ease;
    z-index: 2;
  }
  .sidebar.open ~ .home-section{
    left: 250px;
    width: calc(100% - 250px);
  }
  .home-section .text{
    display: inline-block;
    color: #11101d;
    font-size: 25px;
    font-weight: 500;
    margin: 18px
  }
  @media (max-width: 420px) {
    .sidebar li .tooltip{
      display: none;
    }
  }
  `;

  return (
    <div>
      <div>
        <style>{styles}</style>
        <div className={isOpen ? "sidebar open" : "sidebar"}>
          {/* <div className={isOpen ? "200px" : "50px"}> */}
          <div className="logo-details">
            <i className="bx bx-water"></i>
            <div className="logo_name">Surf School</div>
            <i
              className="bx bx-menu"
              href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
              id="btn"
              onClick={toggleSidebar}
            ></i>
          </div>
          <ul className="nav-list">
            <li>
              <i className="bx bx-search" onClick={toggleSidebar}></i>
              <input type="text" placeholder="Search..." />
              <span className="tooltip">Search</span>
            </li>
            <li>
              <a href="/LoginPage">
                <i className="bx bx-grid-alt"></i>
                <span className="links_name">Dashboard</span>
              </a>
              <span className="tooltip">Dashboard</span>
            </li>
            <li>
              <a href="/FinancialManagement/dashboard">
                <i className="bx bx-money"></i>
                <span className="links_name">Financial</span>
              </a>
              <span className="tooltip">Financial Management</span>
            </li>
            <li>
              <a href="/Event/">
                <i className="bx bx-chat"></i>
                <span className="links_name">Event</span>
              </a>
              <span className="tooltip">Event management</span>
            </li>
            <li>
              <a href="/sesAndResManagement/mainhome">
                <i className="bx bx-pie-chart-alt-2"></i>
                <span className="links_name">Session</span>
              </a>
              <span className="tooltip">Session Management</span>
            </li>
            <li>
              <a href="/staff/dash">
                <i className="bx bx-folder"></i>
                <span className="links_name">Staff</span>
              </a>
              <span className="tooltip">Staff Management</span>
            </li>
            <li>
              <a href="/Sales/Hdashboard">
                <i className="bx bx-cart-alt"></i>
                <span className="links_name">Sales</span>
              </a>
              <span className="tooltip">Sales Dashboard</span>
            </li>
            <li>
              <a href="/customer/dashboard">
                <i className="bx bx-heart"></i>
                <span className="links_name">Customer</span>
              </a>
              <span className="tooltip">Customer Dashboard</span>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-cog"></i>
                <span className="links_name">Setting</span>
              </a>
              <span className="tooltip">Setting</span>
            </li>
            <li className="profile">
              <div className="profile-details">
                <img src="profile.jpg" alt="profileImg" />
                <div className="name_job">
                  <div className="name">Prem Shahi</div>
                  <div className="job">Web designer</div>
                </div>
              </div>
              <i className="bx bx-log-out" id="log_out"></i>
            </li>
          </ul>
        </div>
        <div
          style={{
            marginLeft: isOpen ? "240px" : "70px",
            transition: "all 0.5s ease",
          }}
          className="bars"
        >
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
