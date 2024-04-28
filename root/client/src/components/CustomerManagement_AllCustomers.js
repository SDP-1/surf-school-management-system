import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const CustomerManagement_AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const getCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Customer/customers/alle');
      setCustomers(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditedData(customer);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:4000/Customer/update/${editedData._id}`, editedData);
      const updatedCustomers = customers.map(customer => {
        if (customer._id === editedData._id) {
          return { ...customer, ...editedData };
        }
        return customer;
      });
      setCustomers(updatedCustomers);
      setShowEditModal(false);
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/Customer/delete/${_id}`);
      const updatedCustomers = customers.filter(customer => customer._id !== _id);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const filteredCustomers = customers.filter(customer => {
        return (
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.passport.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setCustomers(filteredCustomers);
    } else {
      getCustomers();
    }
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ color: 'blue', marginBottom: '20px' }}>All Customers</h1>
      <Link className="btn btn-success mb-4" to="/customer"> Add Customer</Link>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Search by Name, Customer ID, or Passport" value={searchTerm} onChange={handleSearchChange} style={{ marginRight: '10px', padding: '5px' }} />
        <button onClick={handleSearch} style={{ backgroundColor: 'lightblue', padding: '5px', border: 'none', cursor: 'pointer' }}>Search</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {customers.map((customer, index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              width: '250px', // Set width to maintain uniform size
              marginBottom: '20px', // Add margin bottom for spacing
              marginRight: '20px', // Add margin right for spacing between grids
            }}
          >
            <div style={{ width: '200px', height: '200px', overflow: 'hidden', margin: '0 auto 15px', borderRadius: '50%' }}>
              {customer.imageData && <img src={`data:${customer.imageContentType};base64,${customer.imageData}`} alt="Customer" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />}
            </div>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Customer ID: {customer.customerId}</p>
            <p>Name: {customer.name}</p>
            <p>Passport: {customer.passport}</p>
            <p>Email: {customer.email}</p>
            <p>Points: {customer.points}</p>
            <p>Membership Level: {customer.membershipLevel}</p>
            <button className='btn btn-info me-2' onClick={() => handleEdit(customer)}>Edit</button>
            <button className='btn btn-danger' onClick={() => handleDelete(customer._id)}>Delete</button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showEditModal}
        onRequestClose={handleCloseEditModal}
        contentLabel="Edit Customer Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            width: '400px',
            margin: 'auto',
            backgroundColor: 'lightblue',
            padding: '20px',
            borderRadius: '10px',
          }
        }}
      >
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Customer</h2>
          <div>
            <label>Customer ID:</label>
            <input type="text" name="customerId" value={editedData.customerId} onChange={handleChange} disabled />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={editedData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Passport:</label>
            <input type="text" name="passport" value={editedData.passport} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={editedData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Points:</label>
            <input type="number" name="points" value={editedData.points} onChange={handleChange} />
          </div>
          <div>
            <label>Membership Level:</label>
            <select name="membershipLevel" value={editedData.membershipLevel} onChange={handleChange}>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <button onClick={handleCloseEditModal} className="btn btn-danger">Cancel</button>
            <button onClick={handleSaveChanges} className="btn btn-success">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomerManagement_AllCustomers;
