const express  = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const app = express();


const PORT = process.env.PORT || 8070

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const connection = mongoose.connection;
connection.once("open",()=> {
    console.log("MongoDB database connected successfully!");
});


const employeeRouter = require("./routs/employee.js");
//htttp://localhost:5000/student
app.use("/employee",employeeRouter);

const worksheetRouter=require("./routs/worksheet.js");
app.use("/worksheet",worksheetRouter);

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});




