import React, { useState,useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PaymentGateway from "../pages/FinancialManagement_PaymentGateway";
function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000); // Adjust as needed for desired length
  return `Ev${timestamp}${randomNum}`;
}


function TicketPurchaseForm() {
  const { Title, Price } = useParams();
  const navigate = useNavigate();
  
  // Decode Price from URL and convert it to a number
  const ticketPrice = parseFloat(decodeURIComponent(Price));

  const randomId = generateRandomId();

  // State to manage payment gateway modal visibility
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  let [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(prevCount => prevCount - 1);
    }
  };
  
  // const sendRequest = async () => {
  //   await axios.post("http://localhost:4000/reservations", inputs);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPaymentGateway(true); // Show payment gateway modal
  };

  const handleClosePaymentGateway = () => {
    setShowPaymentGateway(false); // Hide payment gateway modal
  };

// Define a function to redirect after successful payment
const handleSuccessPayment = () => {
  navigate(`/Event/insertCount/${Title}/${ticketCount}`)
};

  const subtotal = ticketPrice * ticketCount;
  const totalAmount = subtotal; // For now, total is the same as subtotal

  return (
    <div className="ticket-form-container">
      <div className="ticket-form">
        <h2>Ticket Purchase for {decodeURIComponent(Title)}</h2>
        <p>Ticket Price: ${ticketPrice}</p>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="ticketCount" style={{ paddingLeft: '20px', marginBottom: '10px' }}>Number of Tickets:</label>
          <div className="ticket-count">
            <button type="button" onClick={handleDecrement}>-</button>
            <input 
              type="text" 
              id="ticketCount" 
              value={ticketCount} 
              readOnly
            />
            <button type="button" onClick={handleIncrement}>+</button>
          </div>
          
          {/* Subtotal and Total Amount */}
          <div className="ticket-summary">
            <p>Subtotal: ${subtotal}</p>
            <p>Total Amount: ${totalAmount}</p>
          </div>
          
          {/* Purchase button */}
          

          <button type="submit" className="purchase-button">
            Purchase
          </button>

        </form>
        {/* Payment gateway modal */}
       {showPaymentGateway && (
        <PaymentGateway
          onClose={handleClosePaymentGateway}
          // referenceNo={inputs.refID}
          referenceNo={randomId}
          payableAmount={subtotal}
          details={`Make a reservation for ${Title}`}
          onSuccessPayment={handleSuccessPayment}
        />
      )}
      </div>
    </div>
  );
}

export default TicketPurchaseForm;