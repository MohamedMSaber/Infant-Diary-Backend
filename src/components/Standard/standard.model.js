const { Schema, model} = require("mongoose");


const schema = Schema({
    height:{type:Number, required:[true, 'height is required']},
    weight:{type:Number, required:[true, 'weight is required']},
    headDiameter:{type:Number, required:[true, 'head diameter is required']},
    age:{type:Number, required:[true, 'age is required']},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female']}
},{ timestamps: true })


module.exports = model('standard' , schema);