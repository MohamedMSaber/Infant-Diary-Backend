const { Schema, model,Types} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    image:{type:Array},
    createdBy:{type: Types.ObjectId,ref:"User",required:true},
    comments:[{type: Types.ObjectId,ref:"comment"}],
    isDeleted:{type:Boolean,default:false},
    deletedBy:{type: Types.ObjectId,ref:"User"},
},{ timestamps: true })


module.exports = model('post' , schema);