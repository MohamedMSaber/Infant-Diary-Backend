const { Schema, model,Types} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'createdByModel'
    },
    createdByModel: {
        type: String,
        required: true,
        enum: ['doctor', 'parent', 'hospital']
    },
    reply:[
        {
            body:{type: String , required: [true, 'body is required']  },
            createdBy:{type: Types.ObjectId,ref:"User",required:true}
        }
    ],
    postID:{type: Types.ObjectId,ref:"post"},
},{ timestamps: true })

schema.pre(/^find/, function () {
    this.populate({
        path: 'createdBy',
        select: 'name ' // Exclude the childerns field
      });;
});

module.exports = model('comment' , schema);