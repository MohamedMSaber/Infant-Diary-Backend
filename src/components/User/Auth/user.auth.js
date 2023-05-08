const { catchAsyncErrors } = require('../../../utils/catchAsync');
const parentModel = require('../Parent/parent.model')
const doctorModel = require('../Doctor/doctor.model');
const adminModel = require('../Admin/admin.model')
const hospitalModel = require('../../Hospital/hospital.model')
const sendEmail = require('../../../utils/sendEmail');
const AppError = require('../../../utils/AppError');
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");
const cloudinary = require('../../../utils/cloudinary');

// sign Up
const signup = catchAsyncErrors(async(req , res , next)=>{
    let {userType} = req.params;
    let user ;
    let newModel;
    if (userType !== 'parent' && userType !== 'doctor' && userType !== 'hospital') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (userType === 'parent') {
            newModel = parentModel;
        } else if (userType === 'doctor') {
            newModel = doctorModel;
        }
        else{
            newModel = hospitalModel;
        }
    }
    user =  await newModel.findOne({ email: req.body.email });
    if (!user) {
        if (userType == 'doctor'){
            console.log(req.file);
            const image =await  cloudinary.uploader.upload(req.file.path , {folder: "DoctorsNationalIDs"})
            req.body.nationalIdPhoto =  image.secure_url;
            let newDoctor = new newModel(req.body);
            await newDoctor.save();
            const html = `<h1>We will review your profile and contact you SOON😊...</h1>`;
            sendEmail(newDoctor.email , html )
            res.status(200).json({ Doctor:newDoctor , message :  "Sign Up Successful...'\n'We will review your profile and contact you SOON😊..." });
            console.log(newDoctor)
        }
        else if (userType === 'parent') {
            let newUser = new newModel(req.body);
            await newUser.save();
            const html = `<a href = "${req.protocol}://${req.headers.host}/api/v1/${userType}/confirmEmail/${newUser._id}">Click Here To Confirm Email</a?`;
            sendEmail(newUser.email , html )
            res.status(200).json({ Email:newUser.email , message :  "Sign Up Successfully...plz confirm your EMAIL..." });
        }
        else{
            let newHospital = new newModel(req.body);
            await newHospital.save();
            res.status(200).json({ Hospital:newHospital , message :  "Sign Up Successful...'\n'We will review your profile and contact you SOON😊..." });
            console.log(newHospital)
        }

    }
    else {
        return next(new AppError(`User Already Exist`, 400));
    }
})


// Confirm Email for Parents
const confirmEmail = catchAsyncErrors(async (req, res , next) => {
    const userId = req.params.id;
    await parentModel.findByIdAndUpdate(userId, { emailConfirm: true });
    res.json({ message: "Email Has been Confirmed Successfully", })
})


// Sign In
const signIn = catchAsyncErrors(async (req, res, next) => {
    let {userType} = req.params;
    let user ;
    let newModel;
    if (userType !== 'parent' && userType !== 'doctor' && userType !== 'hospital') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (userType === 'parent') {
            newModel = parentModel;
        } else if (userType === 'doctor') {
            newModel = doctorModel;
        }
        else{
            newModel = hospitalModel;
        }
    }
    user = await newModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError(`Incorrect Email or Password`, 400));
    }
    else if (!user.emailConfirm && userType ==='parent'){
        return next(new AppError(`First Confirm Your Email...`, 400));
    }
    else if (!user.isAccpeted && userType ==='doctor'){
        return next(new AppError(`Your Email Under Reviewing we will Contact You SOON...`, 400));
    }
    let token = jwt.sign({ name : user.name , userId : user._id }, process.env.JWT_KEY);
    res.status(200).json({ token})
})

// Authentication
const ProtectedRoutes = catchAsyncErrors(async(req,res,next)=>{
    let {userType} = req.params;
    let newModel;
    let user;
    if (userType !== 'parent' && userType !== 'doctor' && userType !== 'admin') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (userType === 'parent') {
            newModel = parentModel;
        }
        else if(userType === 'doctor'){
            newModel = doctorModel;
        }
        else if(userType === 'admin'){
            newModel = adminModel;
        }
    }
    //1. check if token Provieded
    let token = req.headers.token;
    if(!token) return next(new AppError('Token is required' , 401))    
    // 2. check if token is valid
    let decodedToken = await jwt.verify(token, process.env.JWT_KEY)
    // 3. check if token user Id is already exist
    user = await newModel.findById(decodedToken.userId);
    console.log(user);
    if (!user) {
        return next(new AppError("User Not Exists" , 401))
    }
    req.user = user;
    next();
})


// Authorization
const AllowedTo = (...roles)=>{
    return catchAsyncErrors(async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError("You not Authorized to Access This Route" , 401))
        }
        next();
    })
}


module.exports = {
    signup,
    confirmEmail,
    signIn,
    ProtectedRoutes,
    AllowedTo
}