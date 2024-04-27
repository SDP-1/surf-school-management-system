const mongoose = require('mongoose')//inorder to connect with mongo db you need this package
const Schema = mongoose.Schema; //attributes of supplier are inside the schema
const ObjectId = Schema.Types.ObjectId;
//creating an object and gives supplier properties
const supplierSchema = new Schema ({
suppliercode :{
    type :String,
    required :true
},
suppliername :{
    type :String,
    required :true
},
supplieremail: {
    type: String,
    required: true,
    // Adding email validation using regex
    validate: {
        validator: function(v) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
    }
},
suppliertype:{
    type :String,
    required :true
},
date :{
    type :Date,
    required :true
},
supplierphone: {
    type: String,
    required: true,
    // Adding phone number validation using regex
    validate: {
        validator: function(v) {
            return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    }
},
equipment :{
    type :String,
    required :true
},
price :{
    type :Number,
    required :true
},
quantity :{
    type :Number,
    required :true
},
note :{
    type :String,
    required :true
}
});
const Supplier =  mongoose.model("Supplier",supplierSchema);
module.exports = Supplier;
