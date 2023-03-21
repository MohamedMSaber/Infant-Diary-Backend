const { Schema, model,Types} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    //image:{type:Array},
    createdBy:{type: Types.ObjectId,ref:"User",required:true},
    reply:[{type: Types.ObjectId,ref:"comment"}],
    postId:{type: Types.ObjectId,ref:"post"},
    isDeleted:{type:Boolean,default:false},
    deletedBy:{type: Types.ObjectId,ref:"User"},
},{ timestamps: true })


module.exports = model('comment' , schema);