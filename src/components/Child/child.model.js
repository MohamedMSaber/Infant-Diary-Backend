const { Schema, model,Types} = require("mongoose");
const bcrypt = require('bcrypt');
const vaccineModel = require("../Vaccine/vaccine.model");
const getAge = require("../../utils/getAge");

const schema = Schema({
    name: { type: String, required: [true, 'name is required']},
    birthDate: { type: String, required: [true, 'birthDate is required']},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female'],},
    weight: { type: Number, required: [true, 'weight is required']},
    headDiameter: { type: Number, required: [true, 'headDiameter is required']},
    height: { type: Number, required: [true, 'height is required']},
    profilePic: { type: String},
    parentID:{type: Types.ObjectId,ref:"parent"},
    vaccines:[{type: Types.ObjectId,ref:"vaccine"}],
},{ timestamps: true })


  

module.exports = model('child' , schema);