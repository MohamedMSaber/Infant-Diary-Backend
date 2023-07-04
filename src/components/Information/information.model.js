const { Schema, model} = require("mongoose");

const schema = Schema({
    topic:{type:String, required:[true, 'topic is required']}, //feeding-sleeping-playing
    body:{type:String, required:[true, 'body is required']},
    type:{type:String, required:[true, 'type is required']}, //instructions or article ... 
    age:{type:Number, required:[true, 'age is required']},
    link:{type:String},
    videoLink:{type:String},
    image: { type: String}
},{ timestamps: true })

module.exports = model('information' , schema);