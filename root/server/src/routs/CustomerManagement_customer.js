const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Initialize multer instance

const Customer = require('../models/CustomerManagement_Customer');

// Route to add a new customer with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { customerId, name, passport, email, points, membershipLevel } = req.body;

    let image = null;
    if (req.file) {
      image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const newCustomer = new Customer({
      customerId,
      name,
      passport,
      email,
      points,
      membershipLevel,
      image
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.route("/customers/alle").get(async (req, res) => {
  try {
      const customers = await Customer.find();

      const customersWithImage = await Promise.all(customers.map(async customer => {
          let imageData = null;
          if (customer.image && customer.image.data) {
              imageData = customer.image.data.toString('base64');
          }
          const { image, ...customerData } = customer.toObject();
          return { ...customerData, imageData };
      }));

      res.json(customersWithImage);
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});




// Route to update an existing customer's photo by id
router.put('/update/photo/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { image: { data: req.file.buffer, contentType: req.file.mimetype } },
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a customer by id
router.delete('/delete/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an existing customer by id
router.put('/update/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single customer by id
router.get('/byid/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Route to get a single customer by name
router.get('/byname/:name', async (req, res) => {
  try {
    const customer = await Customer.findOne({ name: req.params.name });
    res.json(customer);
  } catch (error) {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Route to get a single customer by customerId
router.get('/bycustomerid/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findOne({ customerId: req.params.customerId });
    res.json(customer);
  } catch (error) {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// Route to get a single customer by passport
router.get('/bypassport/:passport', async (req, res) => {
  try {
    const customer = await Customer.findOne({ passport: req.params.passport });
    res.json(customer);
  } catch (error) {
    res.status(404).json({ message: 'Customer not found' });
  }
});


// Import necessary modules and setup


router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
        { customerId: query }, // Exact match by customer ID
        { passport: query } // Exact match by passport ID
      ]
    }).select('name customerId passport email points membershipLevel imageData imageContentType'); // Select necessary fields including image data
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get customers by membership level
router.get('/bymembership/:level', async (req, res) => {
  const membershipLevel = req.params.level;
  try {
    const customers = await Customer.find({ membershipLevel });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modify the existing search route to handle searches by membership level
router.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  const searchField = req.query.field;
  try {
    let query = {};
    if (searchField === 'name') {
      query = { name: { $regex: searchTerm, $options: 'i' } };
    } else if (searchField === 'customerId') {
      query = { customerId: searchTerm };
    } else if (searchField === 'passport') {
      query = { passport: searchTerm };
    } else if (searchField === 'membershipLevel') {
      query = { membershipLevel: searchTerm };
    }
    const customers = await Customer.find(query);
    res.json(customers);
  } catch (error) {
    console.error('Error searching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
// Route to get customers by membership level with image data
router.get('/bymembership/:level', async (req, res) => {
  const membershipLevel = req.params.level;
  try {
    const customers = await Customer.find({ membershipLevel });
    const customersWithImage = customers.map(customer => ({
      ...customer.toObject(),
      imageData: customer.image ? customer.image.data.toString('base64') : null,
      imageContentType: customer.image ? customer.image.contentType : null
    }));
    res.json(customersWithImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



});




module.exports = router;
