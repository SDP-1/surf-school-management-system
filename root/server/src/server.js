const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "20MB" }));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected successfully!");
});


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

 saleRouter = require("./routs/SalesManagement_sales.js");
http://localhost:4000/sale
app.use("/sale",saleRouter);


http://localhost:4000/Rental
 rentalRouter = require("./routs/SalesManagement_rental.js");
app.use("/Rental", rentalRouter);


http://localhost:4000/Receipt
 receiptRouter = require("./routs/SalesManagement_receipt.js");
app.use('/Receipt', receiptRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
