const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required'], trim: true, minLenght: 3},
    email: { type: String, required: [true, 'email is required'], unique: [true, "email must be UNIQUE"]},
    password: { type: String, required: [true, 'password is required'], minlenght: [6, "password must be at least 6 characters"]},
    phone: { type: String, required: [true, 'phone is required']},
    age: { type: Number,required: [true, 'age is required'],},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female'],},
    address: { type: String,required: [true, 'address is required']},
    isBlocked: { type: Boolean, default: false },
    emailConfirm: { type: Boolean, default: false},
    role:{type: String, default:'parent'}
},{ timestamps: true })


schema.pre('save', async function () { 
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
})

schema.pre('findOneAndUpdate', async function (next) {
    console.log(this.model, this.getQuery());
    const hookData = await this.model.findOne(this.getQuery()).select("__v");
    console.log(hookData);
    this.set({ __v: hookData.__v + 1 });
    next();
})
module.exports = model('parent', schema)