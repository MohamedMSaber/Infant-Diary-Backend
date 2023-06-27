const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    answer: { type: String, required: [true, 'answer is required']},
    age: { type: Number, required: [true, 'age is required']},
    questionHeading: { type: String, required: [true, 'questionHeading is required']},
},{ timestamps: true })


module.exports = model('question' , schema);