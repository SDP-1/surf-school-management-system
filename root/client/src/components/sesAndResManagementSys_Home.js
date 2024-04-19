// Home.js
import React from "react";
import Nav from "./sesAndResManagementSys_Nav";
import AdminDashboard from "./sesAndResManagementSys_AdminDashboard";
import ReceptionistDashboard from "./sesAndResManagementSys_ReceptionistDashboard";



const Home = () => {
  return (
    <div>
      <Nav />

      <AdminDashboard />
      <ReceptionistDashboard />
    </div>
  );
};

export default Home;
