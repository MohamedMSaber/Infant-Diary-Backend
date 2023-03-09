const{Schema, model,Types}=require("mongoose");

const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const parentSchema=Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
    email: {
        type: String,
       
        required:[true,'email is required'],
        unique: true
    },
    password: {
        type: String,
        
        required:[true,'password is required'],
    },
    phone: {
        type: String,
        required:[true,'phone is required'],
        
    },
    age: {
        type: Number,
        required:[true,'age is required'],
    },
    gender: {
        type: String,
        required:[true,'gender is required'],
        enum:['Male','Female'],
       
    },
    address: {
        type: String,
        required:[true,'address is required'],
        
    },
    isBlocked: { type: Boolean , default:false },
    emailConfirm: {
        type: Boolean,
        default: false
    },
},
{timestamps:true}
)


parentSchema.pre('save', async function (next) { // hook pre (before saving data in DB)
    console.log(this);
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound)/* to measure strength of password*/ )
    console.log(this);
    next()
})

parentSchema.pre('findOneAndUpdate',async function (next){
    console.log(this.model,this.getQuery());
    const hookData= await this.model.findOne(this.getQuery()).select("__v");
    console.log(hookData);
    this.set({__v:hookData.__v+1});
    next();
})
module.exports=model('parent',parentSchema)