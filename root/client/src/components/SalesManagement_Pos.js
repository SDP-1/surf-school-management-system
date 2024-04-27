import React, { useState, useEffect } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [updateData, setUpdateData] = useState({ name: '', price: '' });
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showQuantityPopup, setShowQuantityPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [receiptNumber, setReceiptNumber] = useState(1000);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [selectedItems]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/sale/item');
      const data = await response.json();
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchItemsByCategory = async (category) => {
    try {
      const response = await fetch(`http://localhost:4000/sale/category/${category}`);
      const data = await response.json();
      setItems(data.sales);
      setSelectedCategory(category);
      fetchItemCount(category);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchItemCount = async (category) => {
    try {
      const response = await fetch(`http://localhost:4000/sale/count/${category}`);
      const data = await response.json();
      setItemCount(data.count);
    } catch (error) {
      console.error('Error fetching item count:', error);
    }
  };

  const handleCategoryClick = (category) => {
    fetchItemsByCategory(category);
  };

  const handleUpdateItem = (name, price) => {
    setUpdateData({ name, price });
    setShowUpdatePopup(true);
  };

  const confirmUpdate = async () => {
    try {
      await fetch(`http://localhost:4000/sale/update/${updateData.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updateData.name,
          price: updateData.price,
        }),
      });
      fetchItemsByCategory(selectedCategory);
      setShowUpdatePopup(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (name) => {
    try {
      await fetch(`http://localhost:4000/sale/delete/${name}`, {
        method: 'DELETE',
      });
      fetchItemsByCategory(selectedCategory);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowQuantityPopup(true);
  };

  const handleQuantityChange = (index, value) => {
    if (value < 0) {
      return;
    }
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = value;
    updatedItems[index].totalPrice = value * updatedItems[index].price;
    setSelectedItems(updatedItems);
  };

  const handleAddItem = () => {
    const totalPrice = selectedItem.price * quantity;
    const newItem = { ...selectedItem, quantity, totalPrice };
    setSelectedItems(prevItems => [...prevItems, newItem]);
    setShowQuantityPopup(false);
  };

  const handleRemoveSelectedItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleShowFinalAmount = () => {
    calculateTotalAmount();
  };

  const calculateTotalAmount = () => {
    let total = 0;
    selectedItems.forEach(item => {
      total += item.totalPrice;
    });
    setTotalAmount(total);
  };

  const generateReceipt = async () => {
    try {
      const response = await fetch('http://localhost:4000/Receipt/receipts/last');
      const data = await response.json();
  
      // Check if there is no receipt ID available
      const newReceiptID = data.lastReceiptId || 1000;
  
      let receiptContent = `Receipt Number: ${newReceiptID}\n`;
      receiptContent += "Date: " + new Date().toLocaleDateString() + "\n";
      receiptContent += "\n";
      receiptContent += "Items:\n";
      selectedItems.forEach((item, index) => {
        receiptContent += `${index + 1}. ${item.name} - Quantity: ${item.quantity}, Total Price: LKR ${item.totalPrice}\n`;
      });
      receiptContent += "\n";
      receiptContent += `Total Amount: LKR ${totalAmount}`;
  
      return receiptContent;
    } catch (error) {
      console.error('Error generating receipt:', error);
      return null;
    }
  };
  

  

  const handleGenerateReceipt = async () => {
    try {
      const receiptContent = await generateReceipt();
      if (receiptContent) {
        const element = document.createElement("a");
        const file = new Blob([receiptContent], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "receipt.txt";
        document.body.appendChild(element);
        element.click();
        setReceiptNumber(prevNumber => prevNumber +1);
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
    }
  };
  const handleAddReceiptToDatabase = async () => {
    try {
      const receiptContent = await generateReceipt();
      if (receiptContent) {
        // Fetch the last receipt ID
        const lastReceiptResponse = await fetch('http://localhost:4000/Receipt/receipts/last');
        const lastReceiptData = await lastReceiptResponse.json();
        const lastReceiptId = lastReceiptData.lastReceiptId || 999; // Assuming the initial receipt ID is 999
  
        // Generate a new receipt ID based on the last one
        const newReceiptId = lastReceiptId ;
  
        const description = selectedItems.map(item => `${item.name} - Quantity: ${item.quantity}`).join(', ');
        const finalAmount = totalAmount;
  
        // Add the receipt to the database
        await fetch('http://localhost:4000/Receipt/addrc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            receiptId: `${newReceiptId}`,
            description,
            finalAmount,
          }),
        });
  
        setSelectedItems([]);
        setTotalAmount(0);
        alert('Receipt added to database successfully.');
      }
    } catch (error) {
      console.error('Error adding receipt to database:', error);
    }
  };
  

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ margin: '20px', backgroundColor: '#fff', color: 'black', minHeight: '100vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ marginRight: '50px' }}>
        <h1 style={{ color: 'black', textAlign: 'center' }}>Point of Sale (POS)</h1>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category, index) => (
            <div
              key={index}
              style={{
                backgroundColor: ['#1a237e', '#880e4f', '#006064', '#4a148c'][index % 4],
                color: '#fff',
                padding: '20px',
                margin: '10px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                width: '200px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
              onClick={() => handleCategoryClick(category)}
            >
              {category ? category.replace('_', ' ') : 'No Category'}
            </div>
          ))}
        </div>
        {selectedCategory && (
          <div style={{ marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#212121', color: '#fff', padding: '10px', textAlign: 'left' }}>Item ID</th>
                  <th style={{ backgroundColor: '#212121', color: '#fff', padding: '10px', textAlign: 'left' }}>Price (LKR)</th>
                  <th style={{ backgroundColor: '#212121', color: '#fff', padding: '10px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#424242' : '#212121' }}>
                    <td style={{ color: '#fff', padding: '10px' }}>{item.name}</td>
                    <td style={{ color: '#fff', padding: '10px' }}>LKR {item.price}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }} onClick={() => handleUpdateItem(item.name, item.price)}>Update</button>
                      <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleDeleteItem(item.name)}>Delete</button>
                      <button style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleSelectItem(item)}>Select</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        {selectedItems.length > 0 && (
          <div>
            <h2 style={{ textAlign: 'center' }}>Selected Items</h2>
            <div style={{ padding: '20px', backgroundColor: '#212121', borderRadius: '10px', maxWidth: '400px', margin: '0 auto' }}>
              {selectedItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #fff', paddingBottom: '10px' }}>
                  <p style={{ color: '#fff', marginBottom: '5px' }}>{item.name} - Quantity: {item.quantity}</p>
                  <p style={{ color: '#fff', marginBottom: '5px' }}>Total Price: LKR {item.totalPrice}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', marginRight: '5px' }} onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                    <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} style={{ width: '50px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center' }} />
                    <button style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                    <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px', cursor: 'pointer', marginLeft: '5px' }} onClick={() => handleRemoveSelectedItem(index)}>Remove</button>
                  </div>
                </div>
              ))}
              <h3 style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}>Total Amount: LKR {totalAmount}</h3>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }} onClick={handleGenerateReceipt}>Generate Receipt</button>
              <button style={{ backgroundColor: '#2196f3', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }} onClick={handleAddReceiptToDatabase}>Payment</button>
            </div>
          </div>
        )}
      </div>

      {showUpdatePopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          zIndex: '9999'
        }}>
          <h3 style={{ marginBottom: '10px' }}>Update Item</h3>
          <input type="text" value={updateData.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" value={updateData.price} onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })} style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <button style={{ backgroundColor: '#2962ff', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }} onClick={confirmUpdate}>Confirm</button>
          <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }} onClick={() => setShowUpdatePopup(false)}>Cancel</button>
        </div>
      )}

      {showQuantityPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          zIndex: '9999'
        }}>
          <h3 style={{ marginBottom: '10px' }}>Enter Quantity</h3>
          <p>Item: {selectedItem.name}</p>
          <p>Price: LKR {selectedItem.price}</p>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ marginBottom: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <button style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }} onClick={handleAddItem}>Add</button>
          <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }} onClick={() => setShowQuantityPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
