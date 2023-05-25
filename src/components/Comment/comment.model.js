const { Schema, model,Types} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    createdBy:{type: Types.ObjectId,ref:"User",required:true},
    reply:[
        {
            body:{type: String , required: [true, 'body is required']  },
            createdBy:{type: Types.ObjectId,ref:"User",required:true}
        }
    ],
    postID:{type: Types.ObjectId,ref:"post"},
},{ timestamps: true })


module.exports = model('comment' , schema);