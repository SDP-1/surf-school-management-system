import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const CustomerManagement_OfferDetails = () => {
    const [lastAddedEvent, setLastAddedEvent] = useState(null);
    const [freeTicketWinners, setFreeTicketWinners] = useState([]);
    const [eligibleCustomers, setEligibleCustomers] = useState([]);
    const [purchasedTickets, setPurchasedTickets] = useState([]);

    useEffect(() => {
        const fetchLastAddedEvent = async () => {
            try {
                const response = await axios.get('http://localhost:4000/event/');
                const sortedEvents = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setLastAddedEvent(sortedEvents[0]);
            } catch (error) {
                console.error('Error fetching last added event:', error);
            }
        };

        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/Customer/customers/alle');
                const sortedCustomers = response.data.sort((a, b) => b.points - a.points);
                const topThreeCustomers = sortedCustomers.slice(0, 3);
                setFreeTicketWinners(topThreeCustomers);

                // Filter customers with more than 100 points
                const eligibleCustomers = sortedCustomers.filter(customer => customer.points > 100);
                setEligibleCustomers(eligibleCustomers);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchLastAddedEvent();
        fetchCustomers();
    }, []);

    const handleGenerateCoupon = async (customerId, points, name, discount) => {
        try {
            const updatedPoints = points - 100; // Deduct 100 points
            const response = await axios.put(`http://localhost:4000/Customer/update/${customerId}`, {
                points: updatedPoints
            });
            console.log('Coupon generated successfully:', response.data);
            const doc = new jsPDF();
            doc.setFontSize(12);
            doc.text("Coupon Details", 10, 10);
            doc.text(`Customer ID: ${customerId}`, 10, 20);
            doc.text(`Name: ${name}`, 10, 30);
            doc.text(`Discount: ${discount}`, 10, 40);
            doc.save("Coupon.pdf");
            alert('Coupon generated successfully! Points reduced.');
            window.location.reload(); // Refresh page to reflect updated points
        } catch (error) {
            console.error('Error generating coupon:', error);
        }
    };

    const handlePurchaseTicket = async (customerId) => {
        try {
            // Generate PDF ticket
            if (lastAddedEvent && !purchasedTickets.includes(customerId)) {
                const doc = new jsPDF();
                doc.setFontSize(12);
                doc.text("VIP Ticket", 10, 10);
                doc.text(`Event Title: ${lastAddedEvent.Title}`, 10, 20);
                doc.text(`Location: ${lastAddedEvent.Location}`, 10, 30);
                doc.addImage(lastAddedEvent.Image, 'JPEG', 10, 40, 100, 50); // Assuming image is base64 encoded
                doc.save("VIP_Ticket.pdf");

                // Update purchased tickets
                setPurchasedTickets([...purchasedTickets, customerId]);
            }
        } catch (error) {
            console.error('Error purchasing ticket:', error);
        }
    };

    const calculateDiscount = (membershipLevel) => {
        if (membershipLevel === 'Platinum') {
            return '5%';
        } else if (membershipLevel === 'Gold') {
            return '3%';
        }
        return 'No discount';
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            {lastAddedEvent && (
                <>
                    <div>
                        <div>
                            {lastAddedEvent.Image && <img src={lastAddedEvent.Image} alt="Event Image" style={{ maxWidth: '100%', height: '150px', paddingBottom: '10px' }} />}
                            <h2>{lastAddedEvent.Title}</h2>
                            <p>{lastAddedEvent.Location}</p>
                            {/* Display other event details */}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <h3>Free Ticket Winners:</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {freeTicketWinners.map((customer) => (
                                    <li key={customer._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <span>{customer.name}</span>
                                        <button
                                            onClick={() => handlePurchaseTicket(customer._id)}
                                            disabled={purchasedTickets.includes(customer._id)}
                                            style={{
                                                backgroundColor: purchasedTickets.includes(customer._id) ? 'gray' : 'blue',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                cursor: purchasedTickets.includes(customer._id) ? 'not-allowed' : 'pointer',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {purchasedTickets.includes(customer._id) ? "Purchased" : "Purchase"}
                                        </button>
                                       
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom: '10px' }}>Eligible Customers (More than 100 points):</h3>
                        <div style={{ width: 'calc(100% - 40px)' }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%', marginLeft: '10px', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Passport</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Points</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eligibleCustomers.map((customer) => (
                                        <tr key={customer._id}>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.name}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.passport}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.email}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.points}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                                <button
                                                    onClick={() => handleGenerateCoupon(customer._id, customer.points, customer.name, calculateDiscount(customer.membershipLevel))}
                                                    style={{
                                                        backgroundColor: 'blue',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '5px 10px',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        marginRight: '5px'
                                                    }}
                                                >
                                                    Coupon
                                                </button>
                                                <span>Discount: {calculateDiscount(customer.membershipLevel)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CustomerManagement_OfferDetails;
