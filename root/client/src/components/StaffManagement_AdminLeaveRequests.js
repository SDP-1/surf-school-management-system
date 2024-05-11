import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:4000/LeaveRequest/requests');
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests: ', error);
    }
  };

  const handleConcern = async (id, index) => {
    const adminComment = prompt('Enter admin comment:');
    if (!adminComment) return; // If admin comment is empty, do nothing

    try {
      await axios.put(`http://localhost:4000/LeaveRequest/request/${id}`, { status: 'Concerned', adminComment });
      // Refresh leave requests after updating status
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error concerning leave request: ', error);
    }
  };

  const handleUnconcern = async (id) => {
    try {
      await axios.put(`http://localhost:4000/LeaveRequest/request/${id}`, { status: 'Unconcerned' });
      // Refresh leave requests after updating status
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error unconcerning leave request: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/LeaveRequest/request/${id}`);
      // Refresh leave requests after deleting
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error deleting leave request: ', error);
    }
  };

  return (
    <div>
      <h1>All Leave Requests</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {leaveRequests.map((leaveRequest) => (
          <div key={leaveRequest._id} style={{ width: '30%', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', display: 'grid', gap: '5px' }}>
              <div><strong>Employee ID:</strong> {leaveRequest.employeeId}</div>
              <div><strong>Leave Type:</strong> {leaveRequest.leaveType}</div>
              <div><strong>Start Date:</strong> {leaveRequest.startDate}</div>
              <div><strong>End Date:</strong> {leaveRequest.endDate}</div>
              <div><strong>Status:</strong> {leaveRequest.status}</div>
              <div><strong>Admin Comment:</strong> {leaveRequest.adminComment}</div>
              <div>
                {leaveRequest.status === 'Concerned' ? (
                  <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', marginRight: '5px', cursor: 'pointer' }} onClick={() => handleUnconcern(leaveRequest._id)}>Unconcern</button>
                ) : (
                  <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', marginRight: '5px', cursor: 'pointer' }} onClick={() => handleConcern(leaveRequest._id)}>Concern</button>
                )}
                <button style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDelete(leaveRequest._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaveRequests;
