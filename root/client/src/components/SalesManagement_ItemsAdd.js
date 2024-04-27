import React, { useState } from 'react';
import axios from 'axios';

const ItemsAdd = () => {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddItem = async () => {
        try {
            await axios.post('http://localhost:4000/sale/add', { name: itemName, price });
            alert('Item added successfully!');
            setItemName('');
            setPrice('');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2d545e', color: '#fff' }}>
            <div style={{ width: '40%', marginRight: '20px' }}>
                <div style={{ backgroundColor: 'rgba(18, 52, 59, 0.2)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(18, 52, 59, 0.6)' }}>
                    <h2 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>Add New Item</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="itemName" style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Item Code:</label>
                        <input
                            type="text"
                            id="itemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            onFocus={(e) => e.target.style.backgroundColor = '#fff'}
                            onBlur={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            placeholder="Enter item code"
                            style={{ width: '100%', padding: '8px', border: 'none', borderRadius: '5px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="price" style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onFocus={(e) => e.target.style.backgroundColor = '#fff'}
                            onBlur={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            placeholder="Enter price"
                            style={{ width: '100%', padding: '8px', border: 'none', borderRadius: '5px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                        />
                    </div>
                    <button
                        onClick={handleAddItem}
                        style={{ backgroundColor: '#4CAF50', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '100%', marginBottom: '10px' }}
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div style={{ position: 'fixed', top: '50px', right: '20px', backgroundColor: 'rgba(18, 52, 59, 0.8)', padding: '10px', borderRadius: '5px', color: '#fff' }}>
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
