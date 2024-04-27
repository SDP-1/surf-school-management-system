const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


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
const equipmentRouter = require('./routs/Equipmentmanagement_equipmentRt.js');
const damageEquipmentRouter = require('./routs/EquipmentManagement_damageEquipmentRt.js');
const technicianEmailRouter = require('./routs/EquipmentManagement_technicianEmailRt.js');
const equipmentReservationRouter = require('./routs/EquipmentManagement_equipmentReservationRt.js');
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
