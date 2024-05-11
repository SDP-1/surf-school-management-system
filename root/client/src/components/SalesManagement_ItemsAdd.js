import React, { useState } from 'react';
import axios from 'axios';

const ItemsAdd = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [itemCodeError, setItemCodeError] = useState('');
    const [priceError, setPriceError] = useState('');

    const handleItemNameChange = (value) => {
        setItemName(value);
        // Validate item code
        if (!value.trim()) {
            setItemCodeError('Item code is required');
        } else if (!/^([SRO][LSWIFO])/.test(value)) {
            setItemCodeError('Invalid item code');
        } else {
            setItemCodeError('');
        }
    };

    const handlePriceChange = (value) => {
        setPrice(value);
        // Validate price
        if (!value.trim()) {
            setPriceError('Price is required');
        } else if (isNaN(value)) {
            setPriceError('Price must be a number');
        } else {
            setPriceError('');
        }
    };

    const handleAddItem = async () => {
        try {
            if (!itemName.trim() || !price.trim() || isNaN(price) || itemCodeError || priceError) {
                alert('Please fix the errors before submitting.');
                return;
            }
            await axios.post('http://localhost:4000/sale/add', { name: itemName, price });
            alert('Item added successfully!');
            setItemName('');
            setPrice('');
            setItemCodeError('');
            setPriceError('');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fff', color: '#2d545e' }}>
            <div style={{ width: '40%', marginRight: '20px' }}>
                <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(18, 52, 59, 0.6)' }}>
                    <h2 style={{ color: '#2d545e', marginBottom: '20px', textAlign: 'center' }}>Add New Item</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="itemName" style={{ display: 'block', marginBottom: '5px' }}>Item Code:</label>
                        <input
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => handleItemNameChange(e.target.value)}
                            placeholder="Enter item code"
                            style={{ width: '100%', padding: '8px', border: '1px solid #2d545e', borderRadius: '5px', color: '#2d545e' }}
                        />
                        {itemCodeError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{itemCodeError}</p>}
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            placeholder="Enter price"
                            style={{ width: '100%', padding: '8px', border: '1px solid #2d545e', borderRadius: '5px', color: '#2d545e' }}
                        />
                        {priceError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{priceError}</p>}
                    </div>
                    <button
                        onClick={handleAddItem}
                        style={{ backgroundColor: '#4CAF50', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '100%', marginBottom: '10px' }}
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div style={{ position: 'fixed', top: '50px', right: '20px', backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '5px', color: '#2d545e' }}>
                <h3>Instructions</h3>
                <p>Valid Item Codes:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><strong>SL:</strong> Sales_Longboard</li>
                    <li><strong>SS:</strong> Sales_Shortboard</li>
                    <li><strong>SW:</strong> Sales_Swimwear</li>
                    <li><strong>SF:</strong> Sales_Fins</li>
                    <li><strong>RL:</strong> Rental_Longboard</li>
                    <li><strong>RS:</strong> Rental_Shortboard</li>
                    <li><strong>RW:</strong> Rental_Swimwear</li>
                    <li><strong>RF:</strong> Rental_Fins</li>
                    <li><strong>OI:</strong> Other_Items</li>
                </ul>
            </div>
        </div>
    );
};

export default ItemsAdd;
