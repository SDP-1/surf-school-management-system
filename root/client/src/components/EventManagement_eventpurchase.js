import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TicketPurchaseForm() {
  const { Title, Price } = useParams();
  
  // Decode Price from URL and convert it to a number
  const ticketPrice = parseFloat(decodeURIComponent(Price));

  let [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(prevCount => prevCount - 1);
    }
  };

  const subtotal = ticketPrice * ticketCount;
  const totalAmount = subtotal; // For now, total is the same as subtotal

  return (
    <div className="ticket-form-container">
      <div className="ticket-form">
        <h2>Ticket Purchase for {decodeURIComponent(Title)}</h2>
        <p>Ticket Price: ${ticketPrice}</p>
        
        <form>
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
          <Link 
            to={`/Event/insertCount/${encodeURIComponent(Title)}/${encodeURIComponent(ticketCount)}`} 
            className="purchase-button"
          >
            Purchase
          </Link>
        </form>
      </div>
    </div>
  );
}

export default TicketPurchaseForm;
