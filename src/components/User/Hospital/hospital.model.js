const { Schema, model, default: mongoose, Types} = require("mongoose");
const bcrypt = require('bcrypt');

const schema = Schema({
    name: { type: String, required: [true, 'name is required']},
    email: { type: String, required: [true, 'email is required'], unique: true},
    password: { type: String, required: [true, 'password is required']},
    address: { type: String, required: [true, 'address is required']},
    city: { type: String},
    state: { type: String},
    zip: { type: String},
    phone: { type: String},
    role:{type: String, default:'hospital'},
    services:[{type:Types.ObjectId , ref:"service"}],
    link: { type: String},
    vaccines:[{type:mongoose.Schema.Types.ObjectId,ref:"vaccine"}],
    isBlocked: { type: Boolean, default: false },
    isAccpeted:{type: Boolean, default: false},
    verficationImage:{type: String, required: [true, 'verfication Image is required']}
},{ timestamps: true })

schema.pre('save', async function () { 
    // Check if the document is new (sign-up process)
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound));
    }
})

module.exports = model('hospital' , schema);