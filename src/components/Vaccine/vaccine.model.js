const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required']},
    compulsory:{type: String, required:[true, 'you must mention if it is compulsory or not'], enum:['Mandatory', 'Elective']},
    dose:{type: Number, required:[true, 'dose is required']},
    age:{type: Number, required:[true, 'age is required']},
    sideEffects:{type: String, required:[true, 'side effects is required']},
    reason:{type: String, required:[true, 'reason is required']},
},{ timestamps: true })


module.exports = model('vaccine' , schema);