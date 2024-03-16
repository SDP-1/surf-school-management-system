// Save Payment
const payment = require('../models/payment');

module.exports.setPayment = async function(req, res) {
    let newPayment = new payment(req.body);

    newPayment.save()
        .then(savedPayment => {
            res.status(200).json({
                success: "Payment saved successfully",
                data: savedPayment
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error.message
            });
        });
};

// Get Payment
module.exports.getpayment = async function(req, res) {
    try {
        const Payments = await payment.find().exec();

        return res.status(200).json({
            success: true,
            existingPayment: Payments
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// Get Payment by id
module.exports.getPaymentById = async(req,res)=>{
        let userId = req.params.id;
    
        await payment.findById(userId).then( (payment)=>{
            res.status(200).send({status : "Freach Successfully" , data : payment}); 
        }).catch((err)=> {
            console.log(err); 
            res.status(400).send({status :"Payment Freching Faild"});
            //500 - internal server error
        });
        
    };

// Update Payment
module.exports.updatePayment = async function(req, res) {
    payment.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true } // This option returns the updated document
    )
        .then(updatedPayment => {
            return res.status(200).json({
                success: "Update Successfully",
                updatedPayment: updatedPayment
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err.message
            });
        });
};

// Delete Payment
module.exports.deletePayment = async function(req, res) {
    payment.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then((deletedPayment) => {
            if (!deletedPayment) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }

            return res.json({
                message: "Delete Successful",
                deletedPayment
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "Delete Unsuccessful",
                error: err.message
            });
        });
};
