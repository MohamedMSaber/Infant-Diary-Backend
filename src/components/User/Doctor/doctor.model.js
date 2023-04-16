const { Schema, model, Types} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required'], trim: true, minLenght: 3},
    email: { type: String, required: [true, 'email is required'], unique: [true, "email must be UNIQUE"]},
    password: { type: String, required: [true, 'password is required'], minlenght: [6, "password must be at least 6 characters"]},
    age: { type: Number,required: [true, 'age is required'],},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female'],},
    nationalIdPhoto: {type: String, required:[true, 'National ID Image is Required']},
    specialization: { type: String, trim: true, minLenght: 3},
    clinc:[{ type: Types.ObjectId , ref:"clinic" }],
    phone: { type: String},
    isBlocked: { type: Boolean, default: false },
    isAccpeted:{type: Boolean, default: false},
    role:{type: String, default:'doctor'}
},{ timestamps: true })

schema.pre('save', async function () { 
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
})


module.exports = model('doctor' , schema);