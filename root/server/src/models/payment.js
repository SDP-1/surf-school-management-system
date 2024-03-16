const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    refId: {
        type: String,
        required: true
    },
    amountDue: {
        type: Number,
        required: true
    },
    cashType: {
        type: String,
        required: true
    },
    Advance: {
        type: Boolean,
        default : false,
        required: true
    },
    amountPaid:{
        type : Number,
        default : 0,
        requied : true
    }

});


module.exports = mongoose.model('Payment', postSchema);

