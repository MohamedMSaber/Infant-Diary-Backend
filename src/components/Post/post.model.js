const { Schema, model,Types} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    image:{type:String},
    createdBy:{type: Types.ObjectId,ref:"User",required:true}
},{ timestamps: true, toJSON: { virtuals: true }, toObject:{ virtuals: true } } )

schema.virtual('comments',{
    ref:'comment',
    localField: '_id',
    foreignField: 'postID'
});

schema.pre(/^find/, function () {
    this.populate('comments' , '')
})

module.exports = model('post' , schema);