import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LeaveRequestForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/LeaveRequest/request', formData);
      console.log(response.data);
      alert('Leave request submitted successfully');
      setFormData({
        employeeId: '',
        leaveType: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error(error.message);
      alert('Failed to submit leave request');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Leave Request Form</h1>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', border: '1px solid #ced4da', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Leave Type:</label>
          <textarea
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
            required
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
            required
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Submit</button>
      </form>
      <Link to="/staff/request/:employeeId" style={{ display: 'block', marginTop: '10px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Show leave</Link>
    </div>
  );
};

export default LeaveRequestForm;
