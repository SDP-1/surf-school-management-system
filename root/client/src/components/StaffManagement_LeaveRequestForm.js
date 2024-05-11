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
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate employeeId format
    if (name === 'employeeId' && !/^[ESRA]\d*$/.test(value)) {
      setError('Employee ID must start with E, S, R, or A');
    } else {
      setError('');
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleStartDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Set the minimum selectable date for the end date
    const minEndDate = new Date(value);
    minEndDate.setDate(minEndDate.getDate() + 1); // Minimum end date is one day after start date
    document.getElementById('endDate').setAttribute('min', minEndDate.toISOString().split('T')[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return; // Prevent submission if there's an error

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
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
            onChange={handleStartDateChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>End Date:</label>
          <input
            type="date"
            id="endDate"
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
