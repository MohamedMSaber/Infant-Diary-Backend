const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required'], trim: true, minLenght: 3},
    email: { type: String, required: [true, 'email is required'], unique: [true, "email must be UNIQUE"]},
    password: { type: String, required: [true, 'password is required'], minlenght: [6, "password must be at least 6 characters"]},
},{ timestamps: true })

schema.pre('save', async function () { 
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
})


module.exports = model('admin' , schema);