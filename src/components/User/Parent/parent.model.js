const { Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required'], trim: true, minLenght: 3},
    email: { type: String, required: [true, 'email is required'], unique: [true, "email must be UNIQUE"]},
    password: { type: String, required: [true, 'password is required'], minlenght: [6, "password must be at least 6 characters"]},
    phone: { type: String},
    address: { type: String},
    isBlocked: { type: Boolean, default: false },
    emailConfirm: { type: Boolean, default: false},
    role:{type: String, default:'parent'},
    code: { type: String}
},{ timestamps: true, toJSON: { virtuals: true }, toObject:{ virtuals: true } });

schema.virtual('childerns',{
    ref:'child',
    localField: '_id',
    foreignField: 'parentID'
});

schema.pre('findOne', function () {
    this.populate('childerns' , '')
})

schema.pre('save', async function () { 
    // Check if the document is new (sign-up process)
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound));
    }
})

schema.pre('findOneAndUpdate', async function (next) {
    const hookData = await this.model.findOne(this.getQuery()).select("__v");
    this.set({ __v: hookData.__v + 1 });
    next();
})
module.exports = model('parent', schema)