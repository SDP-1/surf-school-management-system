const express = require("express");
const router = express.Router();
const multer = require("multer");
const Employee = require("../models/StaffManagement_Employee");

// Define storage for the images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/add").post(upload.single("image"), async (req, res) => {
    try {
        const { eid, name, age, address, gender, email, contactno } = req.body;

        let image = null;
        if (req.file) {
            image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const newEmployee = new Employee({
            eid,
            name,
            age,
            address,
            gender,
            email,
            contactno,
            image
        });

        await newEmployee.save();
        res.json("Employee added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.route("/images/:id").get(async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee || !employee.image || !employee.image.data) {
            return res.status(404).send("Image not found");
        }

        res.set("Content-Type", employee.image.contentType);
        res.send(employee.image.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.route("/alle").get(async (req, res) => {
    try {
        const employees = await Employee.find();

        const employeesWithImage = await Promise.all(employees.map(async employee => {
            let imageData = null;
            if (employee.image && employee.image.data) {
                imageData = employee.image.data.toString('base64');
            }
            const { image, ...employeeData } = employee.toObject();
            return { ...employeeData, imageData };
        }));

        res.json(employeesWithImage);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.route("/update/:eid").put(upload.single("image"), async (req, res) => {
    try {
        const { name, age, address, gender, email, contactno } = req.body;

        const updateEmployee = {
            name,
            age,
            address,
            gender,
            email,
            contactno
        };

        if (req.file) {
            updateEmployee.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const updatedEmployee = await Employee.findOneAndUpdate({ eid: req.params.eid }, updateEmployee, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ status: "Employee not found" });
        }

        res.status(200).json({ status: "User updated", updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.route("/delete/:eid").delete(async (req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ eid: req.params.eid });

        if (!deletedEmployee) {
            return res.status(404).json({ status: "Employee not found" });
        }

        res.status(200).json({ status: "User deleted", deletedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.route("/get/:eid").get(async (req, res) => {
    try {
        const employee = await Employee.findOne({ eid: req.params.eid });

        if (!employee) {
            return res.status(404).json({ status: "Employee not found" });
        }

        res.status(200).json({ status: "User fetched", employee });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.route("/alle/count").get(async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        res.json({ totalEmployees });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
