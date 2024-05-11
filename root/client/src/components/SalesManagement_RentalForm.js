import React, { useState } from 'react';
import axios from 'axios';

const RentalForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        passportId: '',
        rentalStartDate: '',
        rentalEndDate: '',
        rentalItem: '',
        pricePerDay: '',
        handoverItem: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/Rental/rental/add', formData);
            alert('Rental details added successfully!');
            setFormData({
                customerName: '',
                passportId: '',
                rentalStartDate: '',
                rentalEndDate: '',
                rentalItem: '',
                pricePerDay: '',
                handoverItem: ''
            });
        } catch (error) {
            console.error('Error adding rental details:', error);
            alert('Failed to add rental details. Please try again.');
        }
    };

    return (
        <div style={{ backgroundColor: '#009688', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Rental Details</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Customer Name:</label>
                            <input
                                type="text"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ flex: '1', marginLeft: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Passport ID:</label>
                            <input
                                type="text"
                                name="passportId"
                                value={formData.passportId}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Rental Start Date:</label>
                            <input
                                type="date"
                                name="rentalStartDate"
                                value={formData.rentalStartDate}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ flex: '1', marginLeft: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Rental End Date:</label>
                            <input
                                type="date"
                                name="rentalEndDate"
                                value={formData.rentalEndDate}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Rental Item:</label>
                        <input
                            type="text"
                            name="rentalItem"
                            value={formData.rentalItem}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Price Per Day:</label>
                        <input
                            type="number"
                            name="pricePerDay"
                            value={formData.pricePerDay}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Handover Item:</label>
                        <input
                            type="text"
                            name="handoverItem"
                            value={formData.handoverItem}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#4CAF50', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Add Rental</button>
                </form>
            </div>
        </div>
    );
};

export default RentalForm;
