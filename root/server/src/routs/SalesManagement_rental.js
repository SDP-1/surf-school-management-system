const express = require('express');
const router = express.Router();
const Rental = require('../models/SalesManagement_Rental');

// Route to add a new rental
router.post('/rental/add', async (req, res) => {
    try {
        const newRental = new Rental(req.body);
        await newRental.save();
        res.status(201).json({ message: 'Rental details saved successfully' });
    } catch (error) {
        console.error('Error saving rental details:', error);
        res.status(500).json({ error: 'Failed to save rental details' });
    }
});

// Route to delete a rental by ID
router.delete('/rental/:id', async (req, res) => {
    try {
        await Rental.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Rental deleted successfully' });
    } catch (error) {
        console.error('Error deleting rental:', error);
        res.status(500).json({ error: 'Failed to delete rental' });
    }
});

// Route to update a rental by ID
router.put('/rental/:id', async (req, res) => {
    try {
        await Rental.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Rental updated successfully' });
    } catch (error) {
        console.error('Error updating rental:', error);
        res.status(500).json({ error: 'Failed to update rental' });
    }
});

// Route to get a rental by passport ID
router.get('/rental/passport/:passportId', async (req, res) => {
    try {
        const rental = await Rental.findOne({ passportId: req.params.passportId });
        if (rental) {
            res.status(200).json(rental);
        } else {
            res.status(404).json({ message: 'Rental not found' });
        }
    } catch (error) {
        console.error('Error getting rental by passport ID:', error);
        res.status(500).json({ error: 'Failed to get rental by passport ID' });
    }
});

// Route to get rentals by customer name
router.get('/rental/customer/:customerName', async (req, res) => {
    try {
        const rentals = await Rental.find({ customerName: req.params.customerName });
        res.status(200).json(rentals);
    } catch (error) {
        console.error('Error getting rentals by customer name:', error);
        res.status(500).json({ error: 'Failed to get rentals by customer name' });
    }
});

// Route to get rentals by item name
router.get('/rental/item/:itemName', async (req, res) => {
    try {
        const rentals = await Rental.find({ rentalItem: req.params.itemName });
        res.status(200).json(rentals);
    } catch (error) {
        console.error('Error getting rentals by item name:', error);
        res.status(500).json({ error: 'Failed to get rentals by item name' });
    }
});

// Route to get all rentals
router.get('/rental/all', async (req, res) => {
    try {
        const rentals = await Rental.find();
        res.status(200).json(rentals);
    } catch (error) {
        console.error('Error getting all rentals:', error);
        res.status(500).json({ error: 'Failed to get all rentals' });
    }
});

// Route to get rentals for a specific date
router.get('/rental/date/:date', async (req, res) => {
    try {
        const selectedDate = req.params.date;
        const rentals = await Rental.find({
            $or: [
                { rentalStartDate: { $lte: selectedDate }, rentalEndDate: { $gte: selectedDate } },
                { rentalStartDate: selectedDate },
                { rentalEndDate: selectedDate }
            ]
        });
        res.status(200).json(rentals);
    } catch (error) {
        console.error('Error getting rentals for date:', error);
        res.status(500).json({ error: 'Failed to get rentals for date' });
    }
});


// Route to get rentals for today and tomorrow
router.get('/rental/enddate/todayandtomorrow', async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formattedToday = formatDate(today);
        const formattedTomorrow = formatDate(tomorrow);

        const rentalsToday = await Rental.find({ rentalEndDate: formattedToday });
        const rentalsTomorrow = await Rental.find({ rentalEndDate: formattedTomorrow });

        const rentalsEndingTodayAndTomorrow = [...rentalsToday, ...rentalsTomorrow];

        res.status(200).json(rentalsEndingTodayAndTomorrow);
    } catch (error) {
        console.error('Error getting rentals ending today and tomorrow:', error);
        res.status(500).json({ error: 'Failed to get rentals ending today and tomorrow' });
    }
});

// Function to format date as 'YYYY-MM-DD'
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Route to send notifications for rentals ending in two days
router.get('/rental/notifications', async (req, res) => {
    try {
        // Calculate the date two days from now
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
        
        // Find rentals ending in two days
        const rentals = await Rental.find({ rentalEndDate: twoDaysFromNow });
        
        // Update notification status for these rentals
        for (const rental of rentals) {
            rental.notificationSent = true;
            rental.notificationDate = new Date();
            await rental.save();
        }
        
        // Send success response
        res.status(200).json({ message: 'Notifications sent successfully' });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ error: 'Failed to send notifications' });
    }
});



module.exports = router;
