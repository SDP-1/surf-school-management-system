const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const WebSocket = require('ws'); // Import WebSocket module

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB Connection Success!!!');
});

// Import routes
const equipmentRouter = require('./routs/equipmentRt.js');
const damageEquipmentRouter = require('./routs/damageEquipmentRt.js');
const technicianEmailRouter = require('./routs/technicianEmailRt.js');
const equipmentReservationRouter = require('./routs/equipmentReservationRt.js');
console.log('equipmentRt.js is being imported');
// Use routes
app.use('/equipment', equipmentRouter);
app.use('/damageEquipment', damageEquipmentRouter);
app.use('/technicianEmail', technicianEmailRouter);
app.use('/equipmentReservation', equipmentReservationRouter);



// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});



module.exports = app;
