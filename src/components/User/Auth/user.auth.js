const { catchAsyncErrors } = require('../../../utils/catchAsync');
const parentModel = require('../Parent/parent.model')
const doctorModel = require('../Doctor/doctor.model');
const adminModel = require('../Admin/admin.model')
const hospitalModel = require('../Hospital/hospital.model')
const sendEmail = require('../../../utils/sendEmail');
const AppError = require('../../../utils/AppError');
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");
const cloudinary = require('../../../utils/cloudinary');
const db = require('../../../utils/firebaseConfig');
const { collection, doc, setDoc } = require("firebase/firestore");
// sign Up
const signup = catchAsyncErrors(async(req , res , next)=>{
    let {userType} = req.params;
    let user ;
    let newModel;
    if (userType !== 'parent' && userType !== 'doctor' && userType !== 'hospital' && userType !== 'admin') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (userType === 'parent') {
            newModel = parentModel;
        } else if (userType === 'doctor') {
            newModel = doctorModel;
        }else if (userType === 'admin') {
            newModel = adminModel;
        }
        else{
            newModel = hospitalModel;
        }
    }
    user =  await newModel.findOne({ email: req.body.email });
    if (!user) {
        if (userType == 'doctor'){
            const image =await cloudinary.uploader.upload(req.file.path , {folder: "Doctors verfication Image"})
            req.body.verficationImage =  image.secure_url;
            let newDoctor = new newModel(req.body);
            await newDoctor.save();
            const html = `<h1>We will review your profile and contact you SOON😊...</h1>`;
            sendEmail(newDoctor.email , html,'Inafant Diary Registration' )
            const admins = await adminModel.find();
            for(const admin of admins) {
                if (admin.verified) {
                    let adminEmail = admin.email;
                    const html = `<h1>New Doctor Registeration with Email ${newDoctor.email}</h1>`;
                    const subject = `New Doctor Registeration`
                    sendEmail(adminEmail, html, subject)
                }
            }
            res.status(200).json({ Doctor:newDoctor , message :  "Sign Up Successful...'\n'We will review your profile and contact you SOON😊..." });
        }
        else if (userType === 'parent') {
            let newUser = new newModel(req.body);
            await newUser.save();
            const html = `<a href = "${req.protocol}://${req.headers.host}/api/v1/${userType}/confirmEmail/${newUser._id}">Click Here To Confirm Email</a?`;
            sendEmail(newUser.email , html,"Infant Diary Confirmation Email" )
            res.status(200).json({ Email:newUser.email , message :  "Sign Up Successfully...plz confirm your EMAIL..." });
        }
        else if (userType === 'admin') {
            let newUser = new newModel(req.body);
            await newUser.save();
            res.status(200).json({ Email:newUser.email , message :  "Sign Up Successfully...." });
        }
        else{
            const image =await cloudinary.uploader.upload(req.file.path , {folder: "hospitals Verefication Images"})
            req.body.verficationImage =  image.secure_url;
            let newHospital = new newModel(req.body);
            await newHospital.save();
            const html = `<h1>We will review your profile and contact you SOON😊...</h1>`;
            sendEmail(newHospital.email , html, 'Inafant Diary Registration')
            const admins = await adminModel.find();
            for(const admin of admins) {
                if (admin.verified) {
                    let adminEmail = admin.email;
                    const html = `<h1>New Hospital Registeration with Email ${newHospital.email}</h1>`;
                    const subject = `New Hospital Registeration`
                    sendEmail(adminEmail, html, subject)
                }
            }
            res.status(200).json({ Hospital:newHospital , message :  "Sign Up Successful...'\n'We will review your profile and contact you SOON😊..." });
        }

    }
    else {
        return next(new AppError(`User Already Exist`, 400));
    }
})
// Confirm Email for Parents
const confirmEmail = catchAsyncErrors(async (req, res , next) => {
    const userId = req.params.id;
    const parent = await parentModel.findByIdAndUpdate(userId, { emailConfirm: true });
    // Save user in Firebase
    const user = {
        email:parent.email,
        name:parent.name,
        role:'parent',
        photoURL:"https://static.vecteezy.com/system/resources/previews/009/346/314/original/family-icon-vector-illustration-on-the-white-background-free-png.png"
    };
    // Get the users collection
    const usersCollectionRef = collection(db, "users");
    // Create a new document with the user's ID
    const userDocRef = doc(usersCollectionRef, parent._id.toString());
    // Set the user document data
    await setDoc(userDocRef, user);
    res.json({ message: "Email Has been Confirmed Successfully", })
})
// Sign In
const signIn = catchAsyncErrors(async (req, res, next) => {
    let {userType} = req.params;
    let user ;
    let newModel;
    if (userType !== 'parent' && userType !== 'doctor' && userType !== 'hospital' && userType !== 'admin') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (userType === 'parent') {
            newModel = parentModel;
        } else if (userType === 'doctor') {
            newModel = doctorModel;
        } else if (userType === 'admin') {
            newModel = adminModel;
        }
        else{
            newModel = hospitalModel;
        }
    }
    user = await newModel.findOne({ email: req.body.email });
    
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError(`Incorrect Email or Password`, 400));
    }else if ((!user.emailConfirm || user.isBlocked) && userType ==='parent'){
        if(user.isBlocked){
            return next(new AppError(`Your Email has Been Blocked We Will Contact You SOON...`, 400));
        }
        return next(new AppError(`First Confirm Your Email...`, 400));
    }else if ((!user.isAccpeted || user.isBlocked) && userType ==='doctor'  ){
        if(user.isBlocked){
            return next(new AppError(`Your Email has Been Blocked We Will Contact You SOON...`, 400));
        }
        return next(new AppError(`Your Email Under Reviewing We Will Contact You SOON...`, 400));
    }else if ((!user.isAccpeted || user.isBlocked) && userType ==='hospital'){
        if(user.isBlocked){
            return next(new AppError(`Your Email has Been Blocked We Will Contact You SOON...`, 400));
        }
        return next(new AppError(`Your Email Under Reviewing we will Contact You SOON...`, 400));
    }else if (!user.verified && userType ==='admin'){
        return next(new AppError(`Your Account is not verified...`, 400));
    }
    let token = jwt.sign({ name : user.name , userId : user._id , type: userType }, process.env.JWT_KEY);
    res.status(200).json({ token})
})

// Authentication  
const ProtectedRoutes = catchAsyncErrors(async(req,res,next)=>{

    let newModel;
    //1. check if token Provieded
    let token = req.headers.token;
    
    if(!token) return next(new AppError('Token is required' , 401))    
    // 2. check if token is valid
    let decodedToken = await jwt.verify(token, process.env.JWT_KEY)
    if (decodedToken.type !== 'parent' && decodedToken.type !== 'doctor' && decodedToken.type !== 'admin' && decodedToken.type !== 'hospital') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (decodedToken.type === 'parent') {
            newModel = parentModel;
        }
        else if(decodedToken.type === 'doctor'){
            newModel = doctorModel;
        }
        else if(decodedToken.type === 'admin'){
            newModel = adminModel;
        }
        else if(decodedToken.type === 'hospital'){
            newModel = hospitalModel;
        }
    }
    // 3. check if token user Id is already exist
    let user = await newModel.findById(decodedToken.userId);
    
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
            return next(new AppError("You not Authorized to Access This Route" ), 401)
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