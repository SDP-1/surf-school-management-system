const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

const sessionRouter = require("./routs/SessionRoutes.js");
const reservationRouter = require("./routs/ReservationRoutes.js");

const PORT = process.env.PORT || 8070;
//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully!");
});

//routes
app.use("/sessions", sessionRouter);
app.use("/reservations", reservationRouter);

//mongoDB connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
