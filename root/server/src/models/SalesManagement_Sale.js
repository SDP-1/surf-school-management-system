const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({

    name: { type: String, required: true },
    price: { type: Number, required: true },
    category:{type:String, required:true }
})

const Sale = mongoose.model( 'Sale', saleSchema );

module.exports = Sale;