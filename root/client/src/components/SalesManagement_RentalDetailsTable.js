import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const RentalDetailsTable = () => {
    const [rentals, setRentals] = useState([]);
    const [selectedRental, setSelectedRental] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const getSessionData = () => {
            const userData = sessionStorage.getItem("userData");
            return userData ? JSON.parse(userData) : null;
        };

        const data = getSessionData();
        setUserData(data);
    }, []);

    const [updatedFormData, setUpdatedFormData] = useState({
        customerName: '',
        passportId: '',
        email: '',
        rentalStartDate: '',
        rentalEndDate: '',
        rentalItem: '',
        pricePerDay: '',
        handoverItem: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    const [errors, setErrors] = useState({});

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
            email: rental.email,
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
        return date.toISOString().split('T')[0];
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedFormData({
            customerName: '',
            passportId: '',
            email: '',
            rentalStartDate: '',
            rentalEndDate: '',
            rentalItem: '',
            pricePerDay: '',
            handoverItem: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFormData({ ...updatedFormData, [name]: value });
        
        // Validate name: Only letters and spaces allowed
        if (name === 'customerName') {
            const isValid = /^[a-zA-Z\s]+$/.test(value);
            setErrors({ ...errors, [name]: isValid ? '' : 'Name can only contain letters and spaces' });
        }

        // Validate rental end date: Must be after start date
        if (name === 'rentalEndDate' && updatedFormData.rentalStartDate) {
            const startDate = new Date(updatedFormData.rentalStartDate);
            const endDate = new Date(value);
            const isValid = endDate > startDate;
            setErrors({ ...errors, [name]: isValid ? '' : 'End date must be after start date' });
        }

        // Validate rental item: Must start with 'R'
        if (name === 'rentalItem') {
            const isValid = value.startsWith('R');
            setErrors({ ...errors, [name]: isValid ? '' : 'Rental item must start with letter R' });
        }

        // Validate price per day: Must be a number
        if (name === 'pricePerDay') {
            const isValid = !isNaN(value);
            setErrors({ ...errors, [name]: isValid ? '' : 'Price must be a number' });
        }

        // Validate handover item: Only letters and spaces allowed
        if (name === 'handoverItem') {
            const isValid = /^[a-zA-Z\s]+$/.test(value);
            setErrors({ ...errors, [name]: isValid ? '' : 'Handover item can only contain letters and spaces' });
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/Rental/rental/${selectedRental._id}`, updatedFormData);
            setIsEditing(false);
            fetchRentals();
        } catch (error) {
            console.error('Error updating rental:', error);
        }
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this rental?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:4000/Rental/rental/${id}`);
                fetchRentals();
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
        doc.text("Surf School Rental Invoice", 45,  9);
        doc.text(`Invoice for Rental ID: ${rental._id}`, 10, 20);
        doc.text(`Customer Name: ${rental.customerName}`, 10, 30);
        doc.text(`Passport ID: ${rental.passportId}`, 10, 40);
        doc.text(`Rental Start Date: ${rental.rentalStartDate}`, 10, 50);
        doc.text(`Rental End Date: ${rental.rentalEndDate}`, 10, 60);
        doc.text(`Rental Item: ${rental.rentalItem}`, 10, 70);
        doc.text(`Price Per Day: ${rental.pricePerDay}`, 10, 80);
        doc.text(`Handover Item: ${rental.handoverItem}`, 10, 90);
        doc.text('Instructions:', 10, 100);
        doc.text('- Please ensure all items are returned in good condition.', 15, 110);
        doc.text('- Any damages will incur additional charges.', 15, 120);
        doc.text('Signature:', 10, 140);
        doc.rect(80, 135, 100, 10);
        doc.save(`invoice_${rental._id}.pdf`);
    };

    const filteredRentals = rentals.filter((rental) =>
        rental.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.passportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.rentalItem.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', color: 'black' }}>
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
                style={{ marginBottom: '10px', padding: '5px' }}
            />
            <table style={{ borderCollapse: 'collapse', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #000' }}>
                <thead style={{ backgroundColor: '#B3E5FC', color: '#03A9F4' }}>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Customer Name</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Passport ID</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Rental Start Date</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Rental End Date</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Rental Item</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Price Per Day</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Handover Item</th>
                        <th style={{ padding: '10px', border: '1px solid #000' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRentals.map((rental) => (
                        <tr key={rental._id} style={{ cursor: 'pointer', backgroundColor: '#FFFFFF', transition: 'background-color 0.3s', border: '1px solid #000' }}>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="customerName"
                                        value={updatedFormData.customerName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.customerName && <span style={{ color: 'red' }}>{errors.customerName}</span>}
                                </>
                            ) : (
                                rental.customerName
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="text"
                                    name="passportId"
                                    value={updatedFormData.passportId}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.passportId
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedFormData.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.email
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="date"
                                    name="rentalStartDate"
                                    value={updatedFormData.rentalStartDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.rentalStartDate
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <input
                                    type="date"
                                    name="rentalEndDate"
                                    value={updatedFormData.rentalEndDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                rental.rentalEndDate
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="rentalItem"
                                        value={updatedFormData.rentalItem}
                                        onChange={handleInputChange}
                                    />
                                    {errors.rentalItem && <span style={{ color: 'red' }}>{errors.rentalItem}</span>}
                                </>
                            ) : (
                                rental.rentalItem
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <>
                                    <input
                                        type="number"
                                        name="pricePerDay"
                                        value={updatedFormData.pricePerDay}
                                        onChange={handleInputChange}
                                    />
                                    {errors.pricePerDay && <span style={{ color: 'red' }}>{errors.pricePerDay}</span>}
                                </>
                            ) : (
                                rental.pricePerDay
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>{isEditing && selectedRental && selectedRental._id === rental._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="handoverItem"
                                        value={updatedFormData.handoverItem}
                                        onChange={handleInputChange}
                                    />
                                    {errors.handoverItem && <span style={{ color: 'red' }}>{errors.handoverItem}</span>}
                                </>
                            ) : (
                                rental.handoverItem
                            )}</td>
                            <td style={{ padding: '10px', border: '1px solid #000' }}>
                                {isEditing && selectedRental && selectedRental._id === rental._id ? (
                                    <>
                                        <button onClick={handleUpdateSubmit} style={{ backgroundColor: 'blue', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', marginRight: '5px' }}>Save</button>
                                        <button onClick={handleCancelClick} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {userData && userData.status !== "Ref" && (
                                                <>
                                                    <button onClick={() => handleUpdateClick(rental)} style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', marginRight: '5px' }}>Edit</button>
                                                    <button onClick={() => handleDeleteClick(rental._id)} style={{ backgroundColor: 'orange', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>Delete</button>
                                                </>
                                            )}
                                            <button onClick={() => handleGenerateInvoice(rental)} style={{ backgroundColor: 'purple', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px', marginLeft: '5px' }}>Invoice</button>
                                        </div>
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
