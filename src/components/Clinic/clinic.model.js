const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required']},
    email: { type: String, required: [true, 'email is required'], unique: true},
    address: { type: String, required: [true, 'address is required']},
    city: { type: String, required: [true, 'city is required']},
    state: { type: String, required: [true,'state is required']},
    zip: { type: String, required: [true, 'zip is required']},
    phone: { type: String, required: [true, 'phone number is required']},
    link: { type: String, required: [true, 'hospital link is required']},
},{ timestamps: true })


module.exports = model('clinic' , schema);