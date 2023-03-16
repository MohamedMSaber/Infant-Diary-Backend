const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    birthDate: { type: Date, required: [true, 'birthDate is required']},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female'],},
    weight: { type: Number, required: [true, 'weight is required']},
    headDiameter: { type: Number, required: [true, 'headDiameter is required']},
    height: { type: Number, required: [true, 'height is required']},
    profilePic: { type: String},
    vaccines:[{type:mongoose.Schema.Types.ObjectId,ref:"vaccine"}],
},{ timestamps: true })


module.exports = model('child' , schema);