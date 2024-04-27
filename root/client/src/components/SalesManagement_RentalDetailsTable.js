import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const RentalDetailsTable = () => {
    const [rentals, setRentals] = useState([]);
    const [selectedRental, setSelectedRental] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedFormData, setUpdatedFormData] = useState({
        customerName: '',
        passportId: '',
        rentalStartDate: '',
        rentalEndDate: '',
        rentalItem: '',
        pricePerDay: '',
        handoverItem: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Rental/rental/all');
            setRentals(response.data);
        } catch (error) {
            console.error('Error fetching rentals:', error);
        }
    };

    const handleUpdateClick = (rental) => {
        setSelectedRental(rental);
        setUpdatedFormData({
            customerName: rental.customerName,
            passportId: rental.passportId,
            rentalStartDate: formatDate(rental.rentalStartDate),
            rentalEndDate: formatDate(rental.rentalEndDate),
            rentalItem: rental.rentalItem,
            pricePerDay: rental.pricePerDay,
            handoverItem: rental.handoverItem
        });
        setIsEditing(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedFormData({
            customerName: '',
            passportId: '',
            rentalStartDate: '',
            rentalEndDate: '',
            rentalItem: '',
            pricePerDay: '',
            handoverItem: ''
        });
    };

    const handleInputChange = (e) => {
        setUpdatedFormData({ ...updatedFormData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/Rental/rental/${selectedRental._id}`, updatedFormData);
            setIsEditing(false);
            fetchRentals(); // Refetch rentals after update
        } catch (error) {
            console.error('Error updating rental:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this rental?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:4000/Rental/rental/${id}`);
                fetchRentals(); // Refetch rentals after deletion
            } catch (error) {
                console.error('Error deleting rental:', error);
            }
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleGenerateInvoice = (rental) => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text("Invoice- Surf shop Rental", 45,  9);
        doc.text(`Invoice for Rental ID: ${rental._id}`, 10, 10);
        doc.text(`Customer Name: ${rental.customerName}`, 10, 20);
        doc.text(`Passport ID: ${rental.passportId}`, 10, 30);

        // Additional details
        doc.text(`Rental Start Date: ${rental.rentalStartDate}`, 10, 40);
        doc.text(`Rental End Date: ${rental.rentalEndDate}`, 10, 50);
        doc.text(`Rental Item: ${rental.rentalItem}`, 10, 60);
        doc.text(`Price Per Day: ${rental.pricePerDay}`, 10, 70);
        doc.text(`Handover Item: ${rental.handoverItem}`, 10, 80);

        // Instructions
        doc.text('Instructions:', 10, 90);
        doc.text('- Please ensure all items are returned in good condition.', 15, 100);
        doc.text('- Any damages will incur additional charges.', 15, 110);

        // Signature
        doc.text('Signature:', 10, 130);

        // Signature box
        doc.rect(80, 125, 100, 10);

        doc.save(`invoice_${rental._id}.pdf`);
    };

    const filteredRentals = rentals.filter((rental) =>
        rental.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.passportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.rentalItem.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '10px', color: 'white' }}>
            <h2>Rental Details</h2>
            <Link to="/Sales/rental/add" style={{ textDecoration: 'none' }}>
                <button style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    margin: '10px 0',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease-in-out',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    background: 'linear-gradient(to bottom, #66bb6a, #43a047)'
                }}>Add Rentals</button>
            </Link>
            <input
                type="text"
                placeholder="Search name, passport, or item"
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={{ marginBottom: '10px', padding: '5px',marginLeft:'800px' }}
            />
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Customer Name</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Passport ID</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Rental Start Date</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Rental End Date</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Rental Item</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Price Per Day</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Handover Item</th>
                        <th style={{ border: '1px solid white', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRentals.map((rental) => (
                        <tr key={rental._id} style={{ cursor: 'pointer', backgroundColor: '#333', transition: 'background-color 0.3s' }}>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="text"
                                    name="customerName"
                                    value={updatedFormData.customerName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.customerName
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="text"
                                    name="passportId"
                                    value={updatedFormData.passportId}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.passportId
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="date"
                                    name="rentalStartDate"
                                    value={updatedFormData.rentalStartDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.rentalStartDate
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="date"
                                    name="rentalEndDate"
                                    value={updatedFormData.rentalEndDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.rentalEndDate
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="text"
                                    name="rentalItem"
                                    value={updatedFormData.rentalItem}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.rentalItem
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="number"
                                    name="pricePerDay"
                                    value={updatedFormData.pricePerDay}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.pricePerDay
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="text"
                                    name="handoverItem"
                                    value={updatedFormData.handoverItem}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.handoverItem
                            )}</td>
                            <td style={{ border: '1px solid white', padding: '10px' }}>
                                {isEditing && selectedRental && selectedRental._id === rental._id ? (
                                    <>
                                        <button onClick={handleUpdateSubmit} style={{ backgroundColor: 'blue', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', marginRight: '5px' }}>Save</button>
                                        <button onClick={handleCancelClick} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleUpdateClick(rental)} style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', marginRight: '5px' }}>Edit</button>
                                        <button onClick={() => handleDeleteClick(rental._id)} style={{ backgroundColor: 'orange', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>Delete</button>
                                        <button onClick={() => handleGenerateInvoice(rental)} style={{ backgroundColor: 'purple', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', marginLeft: '5px' }}>Invoice</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RentalDetailsTable;
