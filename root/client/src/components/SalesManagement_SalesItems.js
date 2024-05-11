import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Popup = ({ updateItem, updatePrice, updateCode, setUpdatePrice, setUpdateCode, saveUpdatedItem, setShowPopup }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            zIndex: '9999',
            background: 'linear-gradient(to bottom right, #f0f0f0, #ffffff)'
        }}>
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h2 style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Update Item</h2>
            <p>Item Code: {updateItem.name}</p>
            <input type="text" placeholder="Item Code" value={updateCode} onChange={(e) => setUpdateCode(e.target.value)} />
            <input type="number" placeholder="Price" value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} />
            <button onClick={saveUpdatedItem} style={{
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
            }}>Save</button>
        </div>
    );
};

const Sales_Items = () => {
    const [items, setItems] = useState([]);
    const [updateItem, setUpdateItem] = useState(null);
    const [updatePrice, setUpdatePrice] = useState('');
    const [updateCode, setUpdateCode] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:4000/sale/item');
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        }
    };

    const updateItems = (item) => {
        setUpdateItem(item);
        setUpdatePrice(item.price);
        setUpdateCode(item.name);
        setShowPopup(true);
    };

    const saveUpdatedItem = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/sale/update/${updateItem.name}`, {
                price: updatePrice,
                name: updateCode
            });
            console.log(response.data);
            fetchItems();
            setUpdateItem(null);
            setUpdatePrice('');
            setUpdateCode('');
            setShowPopup(false);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const deleteItem = async (itemName) => {
        try {
            const response = await axios.delete(`http://localhost:4000/sale/delete/${itemName}`);
            console.log(response.data);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="container">
         <center> <h2>Sales And Rental Items</h2> </center>  
            <Link to="/Sales/add" style={{ textDecoration: 'none' }}>
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
                }}>Add Item</button>
            </Link>
            <table className="sales-table" style={{
                borderCollapse: 'collapse',
                width: '100%',
                backgroundColor: '#f2f2f2',
                border: '1px solid #ddd',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#4CAF50', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Category</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Price</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.name}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.category}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.price}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                <button onClick={() => updateItems(item)} style={{
                                    backgroundColor: '#008CBA',
                                    color: 'white',
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease-in-out',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    background: 'linear-gradient(to bottom, #4dd0e1, #0097a7)'
                                }}>Update</button>
                                <button onClick={() => deleteItem(item.name)} style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease-in-out',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    background: 'linear-gradient(to bottom, #ff7043, #f4511e)'
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showPopup && (
                <Popup
                    updateItem={updateItem}
                    updatePrice={updatePrice}
                    updateCode={updateCode}
                    setUpdatePrice={setUpdatePrice}
                    setUpdateCode={setUpdateCode}
                    saveUpdatedItem={saveUpdatedItem}
                    setShowPopup={setShowPopup}
                />
            )}
        </div>
    );
};

export default Sales_Items;
