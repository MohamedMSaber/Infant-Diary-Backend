const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required'], trim: true, minLenght: 3},
    email: { type: String, required: [true, 'email is required'], unique: [true, "email must be UNIQUE"]},
    password: { type: String, required: [true, 'password is required'], minlenght: [6, "password must be at least 6 characters"]},
    phone: { type: String, required: [true, 'phone is required']},
    age: { type: Number,required: [true, 'age is required'],},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female'],},
    isBlocked: { type: Boolean, default: false },
    nationalIdPhoto: {type: String, required:[true, 'National ID Image is Required']},
    isAccpeted:{type: Boolean, default: false}
},{ timestamps: true })

schema.pre('save', async function () { 
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
})


module.exports = model('doctor' , schema);