import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link if you intend to use it
import Nav from "./sesAndResManagementSys_Nav";
import AdminDashboard from "./sesAndResManagementSys_AdminDashboard";
import ReceptionistDashboard from "./sesAndResManagementSys_ReceptionistDashboard";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getSessionData = () => {
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);
  }, []);

  return (
    <div>
      <Nav />
      {userData && userData.status === "Adm" && (
        <>
          
          <AdminDashboard />
        </>
      )}
      {/* ReceptionistDashboard component should be inside the conditional rendering */}
      {userData && userData.status === "Ref" && <ReceptionistDashboard />}
    </div>
  );
};

export default Home;
