const router = require("express").Router();
let Sale = require("../models/SalesManagement_Sale");

const categoryMap = {
    "SL": "Sales_Longboard",
    "SS": "Sales_Shortboard",
    "SW": "Sales_Swimwear",
    "SF": "Sales_Fins",
    "RL": "Rental_Longboard",
    "RS": "Rental_Shortboard",
    "RW": "Rental_Swimwear",
    "RF": "Rental_Fins",
    "OI": "Other_Items"
};

const allowedPrefixes = Object.keys(categoryMap);

// Add route
router.route("/add").post((req, res) => {
    const { name, price } = req.body;
    const code = name.substring(0, 2); 

    // Check if the code is in the allowed prefixes
    if (allowedPrefixes.includes(code)) {
        const newItem = new Sale({ name, price, category: categoryMap[code] });

        newItem.save()
            .then(() => {
                res.json('Saved to database');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json('Error saving to database');
            });
    } else {
        res.status(400).json('Invalid item code');
    }
});

// Get all sales
router.route("/item").get((req, res) => {
    Sale.find()
        .then((sales) => {
            res.json(sales);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json('Error fetching sales');
        });
});

// Update by name
router.route("/update/:name").put(async (req, res) => {
    try {
        const ename = req.params.name;
        const { name, price } = req.body;
        const code = name.substring(0, 2);

        // Check if the code is in the allowed prefixes
        if (allowedPrefixes.includes(code)) {
            const updateSale = {
                name,
                price,
                category: categoryMap[code]
            };

            const update = await Sale.findOneAndUpdate({ name: ename }, updateSale);

            if (update) {
                res.status(200).send({ status: "Sale updated" });
            } else {
                res.status(404).send({ status: "Sale not found" });
            }
        } else {
            res.status(400).json('Invalid item code');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete by name
router.route("/delete/:name").delete(async (req, res) => {
    const sname = req.params.name;
    await Sale.findOneAndDelete({ name: sname })
        .then(() => {
            res.status(200).send({ status: "deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "error with delete", error: err.message });
        });
});

// Get by name
router.route("/get/:name").get(async (req, res) => {
    const ename = req.params.name;
    Sale.findOne({ name: ename })
        .then((sale) => {
            res.status(200).send({ status: "Sale fetched", sale });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get sale", error: err.message });
        });
});

// Get item count for each category
router.route("/count/:category").get(async (req, res) => {
    const category = req.params.category;
    Sale.countDocuments({ category })
        .then((count) => {
            res.status(200).send({ status: "Count fetched", count });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get count", error: err.message });
        });
});

// Get items by category
router.route("/category/:category").get(async (req, res) => {
    const category = req.params.category;
    Sale.find({ category })
        .then((sales) => {
            res.status(200).send({ status: "Items fetched", sales });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get items", error: err.message });
        });
});

module.exports = router;
