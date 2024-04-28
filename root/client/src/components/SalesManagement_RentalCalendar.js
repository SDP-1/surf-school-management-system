import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const RentalCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [endRentals, setEndRentals] = useState([]);
    const [betweenRentals, setBetweenRentals] = useState([]);

    const fetchRentalsForSelectedDate = async (date) => {
        try {
            const formattedDate = formatDate(date);
            const response = await axios.get(`http://localhost:4000/Rental/rental/date/${formattedDate}`);
            const { end, between } = classifyRentals(response.data, date);
            setEndRentals(end);
            setBetweenRentals(between);
        } catch (error) {
            console.error('Error fetching rentals:', error);
        }
    };

    useEffect(() => {
        fetchRentalsForSelectedDate(selectedDate);
    }, [selectedDate]);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const classifyRentals = (rentals, selectedDate) => {
        const end = [];
        const between = [];
        rentals.forEach(rental => {
            const endDate = new Date(rental.rentalEndDate);
            if (endDate.toDateString() === selectedDate.toDateString()) {
                end.push(rental);
            } else if (selectedDate >= new Date(rental.rentalStartDate) && selectedDate <= endDate) {
                between.push(rental);
            }
        });
        return { end, between };
    };

    const tileClassName = ({ date }) => {
        const formattedDate = formatDate(date);
        if (endRentals.some(rental => formatDate(new Date(rental.rentalEndDate)) === formattedDate) && betweenRentals.some(rental => {
            const startDate = formatDate(new Date(rental.rentalStartDate));
            const endDate = formatDate(new Date(rental.rentalEndDate));
            return formattedDate >= startDate && formattedDate <= endDate;
        })) {
            return 'hasBoth';
        } else if (endRentals.some(rental => formatDate(new Date(rental.rentalEndDate)) === formattedDate)) {
            return 'hasEnd';
        } else if (betweenRentals.some(rental => {
            const startDate = formatDate(new Date(rental.rentalStartDate));
            const endDate = formatDate(new Date(rental.rentalEndDate));
            return formattedDate >= startDate && formattedDate <= endDate;
        })) {
            return 'hasBetween';
        }
        return '';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ADD8E6', minHeight: '100vh', padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: 'white' }}>Rental Calendar</h2>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                style={{ marginBottom: '20px', cursor: 'pointer', background: 'linear-gradient(45deg, #0f2862, #4f5f76, #7d5f3d)', color: 'black' }}
                tileClassName={tileClassName}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                <h3 style={{ textAlign: 'center' }}>End Date Rentals for {selectedDate.toDateString()}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {endRentals.map((rental) => (
                        <div key={rental._id} className="get" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', marginRight: '10px', backgroundColor: '#9e363a', color: 'white' }}>
                            <p>Customer Name: {rental.customerName}</p>
                            <p>Passport ID: {rental.passportId}</p>
                            <p>Rental Item: {rental.rentalItem}</p>
                            <p>Start Date: {new Date(rental.rentalStartDate).toDateString()}</p>
                            <p>End Date: {new Date(rental.rentalEndDate).toDateString()}</p>
                        </div>
                    ))}
                </div>
                <h3 style={{ textAlign: 'center' }}>Between Dates Rentals for {selectedDate.toDateString()}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {betweenRentals.map((rental) => (
                        <div key={rental._id} className="get" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', marginRight: '10px', backgroundColor: '#0f2862', color: 'white' }}>
                            <p>Customer Name: {rental.customerName}</p>
                            <p>Passport ID: {rental.passportId}</p>
                            <p>Rental Item: {rental.rentalItem}</p>
                            <p>Start Date: {new Date(rental.rentalStartDate).toDateString()}</p>
                            <p>End Date: {new Date(rental.rentalEndDate).toDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RentalCalendar;
