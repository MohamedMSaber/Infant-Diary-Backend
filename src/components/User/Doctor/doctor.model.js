const { Schema, model, Types} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required'], trim: true, minLenght: 3},
    email: { type: String, required: [true, 'email is required'], unique: [true, "email must be UNIQUE"]},
    password: { type: String, required: [true, 'password is required'], minlenght: [6, "password must be at least 6 characters"]},
    age: { type: Number,required: [true, 'age is required'],},
    gender: { type: String, required: [true, 'gender is required'], enum: ['Male', 'Female'],},
    verficationImage: {type: String, required: [true, 'verficationImage is required']},
    specialization: { type: String, trim: true, minLenght: 3},
    phone: { type: String},
    isBlocked: { type: Boolean, default: false },
    isAccpeted:{type: Boolean, default: false},
    role:{type: String, default:'doctor'},
    ratings: [
        {
          rating: { type: Number, required: true, min: 0, max: 5 },
          user: { type: Types.ObjectId, ref: 'user', required: true },
          date: { type: Date, default: Date.now }
        }
    ],
    ratingAverage: {type: Number, default:0},
    subscription: {
        status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
        startDate: { type: Date },
        endDate: { type: Date },
        paymentMethod: { type: String },
        subscriptionId: { type: String }
    },
    code: { type: String}
},{ timestamps: true, toJSON: { virtuals: true }, toObject:{ virtuals: true } })

schema.virtual('clinics',{
    ref:'clinic',
    localField: '_id',
    foreignField: 'doctorID'
});
schema.pre('findOne', function () {
    this.populate('clinics' , '')
});
schema.pre('save', async function () { 
    // Check if the document is new (sign-up process)
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound));
    }
});


module.exports = model('doctor' , schema);