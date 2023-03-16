const { Schema, model} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    image:{type:Array},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"comment"}],
    isDeleted:{type:Boolean,default:false},
    deletedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
},{ timestamps: true })


module.exports = model('post' , schema);