const { Schema, model, Types} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required']},
    email: { type: String, required: [true, 'email is required']},
    address: { type: String, required: [true, 'address is required']},
    city: { type: String, required: [true, 'city is required']},
    phone: { type: String, required: [true, 'phone number is required']},
    link: { type: String, required: [true, 'hospital link is required']},
    doctorID: { type: Types.ObjectId , ref:"doctor" },
    lat: { type: String, required: [true, 'lat is required']},
    lng: { type: String, required: [true, 'lng is required']}
},{ timestamps: true })


module.exports = model('clinic' , schema);