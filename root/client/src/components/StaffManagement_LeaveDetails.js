import React, { useState } from 'react';
import axios from 'axios';

const LeaveDetails = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [leaveDetails, setLeaveDetails] = useState(null);

  const handleViewDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/LeaveRequest/request/${employeeId}`);
      setLeaveDetails(response.data);
    } catch (error) {
      console.error(error.message);
      alert('Failed to fetch leave details');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>View Leave Details</h1>
      <p>Enter your employee ID to view your leave request details:</p>
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{ padding: '10px', margin: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleViewDetails} style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>View Details</button>

      {leaveDetails && (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', marginTop: '20px', maxWidth: '500px', textAlign: 'left' }}>
          <h2 style={{ color: '#007bff' }}>Leave Details</h2>
          <p>Employee ID: {leaveDetails.employeeId}</p>
          <p>Leave Type: {leaveDetails.leaveType}</p>
          <p>Start Date: {leaveDetails.startDate}</p>
          <p>End Date: {leaveDetails.endDate}</p>
          <p>Status: {leaveDetails.status}</p>
          <p>Admin Comment: {leaveDetails.adminComment}</p>
        </div>
      )}
    </div>
  );
};

export default LeaveDetails;
