const { Schema, model} = require("mongoose");


const schema = Schema({
    name:{type:String , required:[true ,"service name is required"]},
    age:{type:Number , required:[true]}
},{ timestamps: true })


module.exports = model('service' , schema);