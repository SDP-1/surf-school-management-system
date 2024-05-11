import React, { useState } from 'react';
import axios from 'axios';

const RentalForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        passportId: '',
        email: '',
        rentalStartDate: '',
        rentalEndDate: '',
        rentalItem: '',
        pricePerDay: '',
        handoverItem: ''
    });

    const [errors, setErrors] = useState({
        customerName: '',
        passportId: '',
        email: '',
        rentalItem: '',
        handoverItem: '',
        pricePerDay: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special character validation for customer name, rental item, and handover item
        const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
        const onlyNumbers = /^\d*$/;

        if (name === 'customerName' || name === 'handoverItem') {
            if (specialCharacters.test(value)) {
                setErrors({ ...errors, [name]: 'Special characters are not allowed' });
            } else if (!onlyLettersAndSpaces.test(value)) {
                setErrors({ ...errors, [name]: 'Only letters and spaces are allowed' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }

        // Special character validation for passport ID (only letters and numbers)
        if (name === 'passportId') {
            if (!value.match(/^[a-zA-Z0-9]*$/)) {
                setErrors({ ...errors, [name]: 'Only letters and numbers are allowed' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }

        // Email validation
        if (name === 'email') {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            if (!isValidEmail) {
                setErrors({ ...errors, [name]: 'Please enter a valid email address' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }

        // Price validation
        if (name === 'pricePerDay') {
            if (!onlyNumbers.test(value)) {
                setErrors({ ...errors, [name]: 'Price must be a number' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }

        // Rental item validation
        if (name === 'rentalItem') {
            if (!value.match(/^R[SFLOW]\d*$/)) {
                setErrors({ ...errors, [name]: 'Invalid rental item format. It should start with "R" followed by "S", "F", "L", or "W", and then numbers.' });
            } else {
                setErrors({ ...errors, [name]: '' });
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for any errors before submitting
        for (const key in errors) {
            if (errors[key]) {
                alert('Please fix all errors before submitting');
                return;
            }
        }

        try {
            await axios.post('http://localhost:4000/Rental/rental/add', formData);
            alert('Rental details added successfully!');
            setFormData({
                customerName: '',
                passportId: '',
                email: '',
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
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#ADD8E6', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', width: '70%' }}>
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
                            {errors.customerName && <span style={{ color: 'red' }}>{errors.customerName}</span>}
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
                            {errors.passportId && <span style={{ color: 'red' }}>{errors.passportId}</span>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        </div>
                        <div style={{ flex: '1', marginLeft: '10px' }}>
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
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Rental End Date:</label>
                            <input
                                type="date"
                                name="rentalEndDate"
                                value={formData.rentalEndDate}
                                onChange={handleChange}
                                min={formData.rentalStartDate} // Set min attribute dynamically
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ flex: '1', marginLeft: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Rental Item:</label>
                            <input
                                type="text"
                                name="rentalItem"
                                value={formData.rentalItem}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {errors.rentalItem && <span style={{ color: 'red' }}>{errors.rentalItem}</span>}
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                        <div style={{ flex: '1', marginRight: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Price Per Day:</label>
                            <input
                                type="number"
                                name="pricePerDay"
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {errors.pricePerDay && <span style={{ color: 'red' }}>{errors.pricePerDay}</span>}
                        </div>
                        <div style={{ flex: '1', marginLeft: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Handover Item:</label>
                            <input
                                type="text"
                                name="handoverItem"
                                value={formData.handoverItem}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            {errors.handoverItem && <span style={{ color: 'red' }}>{errors.handoverItem}</span>}
                        </div>
                    </div>
                    <button type="submit" style={{ backgroundColor: '#4CAF50', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Add Rental</button>
                </form>
            </div>
        </div>
    );
};

export default RentalForm;
