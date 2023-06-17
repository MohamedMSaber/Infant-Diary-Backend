const { Schema, model,Types} = require("mongoose");


const schema = Schema({
    body: { type: String, required: [true, 'body is required']},
    image:{type:String},
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'createdByModel'
      },
      createdByModel: {
        type: String,
        required: true,
        enum: ['doctor', 'parent', 'hospital']
      }
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