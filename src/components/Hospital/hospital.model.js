const { Schema, model, default: mongoose, Types} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required']},
    email: { type: String, required: [true, 'email is required'], unique: true},
    password: { type: String, required: [true, 'password is required']},
    address: { type: String, required: [true, 'address is required']},
    city: { type: String, required: [true, 'city is required']},
    state: { type: String, required: [true,'state is required']},
    zip: { type: String, required: [true, 'zip is required']},
    phone: { type: String, required: [true, 'phone number is required']},
    services:[{type:Types.ObjectId , ref:"service"}],
    link: { type: String, required: [true, 'hospital link is required']},
    vaccines:[{type:mongoose.Schema.Types.ObjectId,ref:"vaccine"}],
   
},{ timestamps: true })


module.exports = model('hospital' , schema);