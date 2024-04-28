import React, { useState } from 'react';
import axios from 'axios';

const CustomerManagement_AddCustomer = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    name: '',
    passport: '',
    email: '',
    points: 1,
    membershipLevel: 'Silver',
    image: null,
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email.includes('@')) {
      setError('Email must include @ sign');
      return false;
    }
    if (!formData.customerId.match(/^c\d+$/)) {
      setError('Customer ID must start with "c" followed by numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post('http://localhost:4000/Customer/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
         
        },
      });
      setMessage('Customer added successfully!');
      window.location.href ="/customer/customers"
      setFormData({
        customerId: '',
        name: '',
        passport: '',
        email: '',
        points: 1,
        membershipLevel: 'Silver',
        image: null,
      });
      window.location.href = "/customer/customers";
    } catch (error) {
      console.error(error);
      setMessage('Failed to add customer');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
        <h2>Add Customer</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Customer ID:</label>
            <input type="text" name="customerId" value={formData.customerId} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Passport:</label>
            <input type="text" name="passport" value={formData.passport} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Points:</label>
            <input type="number" name="points" value={formData.points} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Membership Level:</label>
            <select name="membershipLevel" value={formData.membershipLevel} onChange={handleChange} style={{ width: '100%' }}>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '5px' }}>Image:</label>
            <input type="file" name="image" onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Customer</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerManagement_AddCustomer;
