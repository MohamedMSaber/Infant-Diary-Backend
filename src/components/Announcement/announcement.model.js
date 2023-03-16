const { Schema, model} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    title: { type: String, required: [true, 'title is required']},
},{ timestamps: true })

module.exports = model('announcement' , schema);