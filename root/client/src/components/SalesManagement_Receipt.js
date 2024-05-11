import React, { useState, useEffect } from 'react';

function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [updateData, setUpdateData] = useState({ receiptId: '', description: '', finalAmount: '' });
  const [confirmation, setConfirmation] = useState(false);
  const [showUpdateData, setShowUpdateData] = useState(false);
  const [showReceiptDetails, setShowReceiptDetails] = useState(false); // State for showing receipt details

  const [userData, setUserData] = useState(null);
    useEffect(() => {
    const getSessionData = () => {
       
  
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);

  }, []);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const response = await fetch('http://localhost:4000/Receipt/receipts');
      const data = await response.json();
      setReceipts(data);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

  const handleUpdatePopup = (receipt) => {
    setSelectedReceipt(receipt);
    setUpdateData({ receiptId: receipt.receiptId, description: receipt.description, finalAmount: receipt.finalAmount }); // Set initial data
    setShowPopup(true);
  };

  const confirmUpdate = () => {
    setConfirmation(true);
    setShowUpdateData(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setConfirmation(false);
    setShowUpdateData(false);
  };

  const handleYes = async () => {
    try {
      await fetch(`http://localhost:4000/Receipt/receipt/${selectedReceipt._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiptId: updateData.receiptId,
          description: updateData.description,
          finalAmount: updateData.finalAmount,
          updatedDate: new Date().toISOString() // Include updatedDate in the request body
        }),
      });
      fetchReceipts();
      setShowPopup(false);
      setConfirmation(false);
      setShowUpdateData(false);
    } catch (error) {
      console.error('Error updating receipt:', error);
    }
  };
  

  const handleNo = () => {
    setShowPopup(false);
    setConfirmation(false);
    setShowUpdateData(false);
  };

  const handleUpdateDataChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleDeleteReceipt = async (id) => {
    try {
      await fetch(`http://localhost:4000/Receipt/receipt/${id}`, {
        method: 'DELETE',
      });
      fetchReceipts();
    } catch (error) {
      console.error('Error deleting receipt:', error);
    }
  };

  const showReceiptPopup = (receipt) => {
    setSelectedReceipt(receipt);
    setShowReceiptDetails(true);
  };

  return (
    <div>
      <center> <h2>All Receipts</h2> </center>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', borderRadius: '5px' }}>
        <thead>
          <tr style={{ backgroundColor: '#4CAF50', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Receipt ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Description</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Final Amount</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Created Date</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt._id} style={{ backgroundColor: '#f2f2f2' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{receipt.receiptId}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{receipt.description}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{receipt.finalAmount}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(receipt.createdAt).toLocaleDateString()}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
              <div>
              {userData && userData.status !== "Ref" && (   
              <>
                <button style={{ backgroundColor: '#008CBA', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', marginRight: '5px' }} onClick={() => handleUpdatePopup(receipt)}>Update</button>
                <button style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', marginRight: '5px' }} onClick={() => handleDeleteReceipt(receipt._id)}>Delete</button>
                </>
                )}
                </div>
                <button style={{ backgroundColor: '#555555', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px' }} onClick={() => showReceiptPopup(receipt)}>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          zIndex: '9999',
          transition: 'all 0.3s ease'
        }}>
          {confirmation ? (
            <div>
              <p>Are you sure you want to update?</p>
              <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', marginRight: '5px' }} onClick={handleYes}>Yes</button>
              <button style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px' }} onClick={handleNo}>No</button>
            </div>
          ) : (
            <div>
              <h3>Update Receipt</h3>
              <p>Receipt ID: {selectedReceipt.receiptId}</p>
              <input type="text" name="description" value={updateData.description} onChange={handleUpdateDataChange} />
              <input type="text" name="finalAmount" value={updateData.finalAmount} onChange={handleUpdateDataChange} />
              <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', marginRight: '5px' }} onClick={confirmUpdate}>Update</button>
              <button style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px' }} onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      )}

      {/* Receipt Details Popup */}
      {showReceiptDetails && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          zIndex: '9999',
          transition: 'all 0.3s ease'
        }}>
          <h3>Receipt Details</h3>
          <p>Receipt ID: {selectedReceipt.receiptId}</p>
          <p>Description: {selectedReceipt.description}</p>
          <p>Final Amount: {selectedReceipt.finalAmount}</p>
          <p>Created Date: {new Date(selectedReceipt.createdAt).toLocaleDateString()}</p>
          <button style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px' }} onClick={() => setShowReceiptDetails(false)}>Close</button>
        </div>
      )}
     
    </div>
  );
}

export default Receipts;
