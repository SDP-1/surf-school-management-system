const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8070;

 // Set a higher limit, e.g., 10MB

app.use(bodyParser.json({ limit: "100MB" }));
app.use(express.json());
app.use(cors());

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

const sessionRouter = require("./routs/SessionRoutes.js");
const reservationRouter = require("./routs/ReservationRoutes.js");

app.use("/sessions", sessionRouter);
app.use("/reservations", reservationRouter);

const eventRouter = require("./routs/EventManagement_events.js");
app.use("/event", eventRouter);

const postPayments = require("./routs/FinancialManagement_payment");
app.use(postPayments);

const postOutgoing = require("./routs/FinancialManagement_outgoing.js");
app.use(postOutgoing);

const postTransaction = require("./routs/FinancialManagement_Transaction");
app.use(postTransaction);

const postMonthlyTarget = require("./routs/FinancialManagement_MonthlyTargets.js");
app.use(postMonthlyTarget);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
