const parentModel = require('../user.model')
const AppError = require("../../../utils/AppError");
const { catchAsyncErrors } = require("../../../utils/catchAsync");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../../utils/sendEmail');

// Sign Up user
const signup = catchAsyncErrors(async(req , res , next)=>{
    let user = await parentModel.findOne({ email: req.body.email });
    if (!user) {
        let newUser = new parentModel(req.body);
        await newUser.save();
        const html = `<a href = "${req.protocol}://${req.headers.host}/api/v1/parent/confirmEmail/${newUser._id}">Click Here To Confirm Email</a?`;
        sendEmail(newUser.email , html )
        console.log(newUser);
        res.status(200).json({ Email:newUser.email , message :  "Sign Up Successfully ...plz confirm your EMAIL..." });
    }

    else {
        return next(new AppError(`User Already Exist`, 400));
    }
})

// Confirm Email
const confirmEmail = catchAsyncErrors(async (req, res , next) => {
    const userId = req.params.id;
    await parentModel.findByIdAndUpdate(userId, { emailConfirm: true });
    res.json({ message: "Email Has been Confirmed Successfully", })
})

// sign In

const signIn = catchAsyncErrors(async (req, res, next) => {
    let user = await parentModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError(`Incorrect Email or Password`, 400));
    }
    else if (!user.emailConfirm){
        return next(new AppError(`First Confirm Your Email...`, 400));
    }
    console.log("here");
    let token = jwt.sign({ name : user.name , userId : user._id }, process.env.JWT_KEY);
    res.status(200).json({ token})
})

module.exports = {
    signup,
    confirmEmail,
    signIn
}