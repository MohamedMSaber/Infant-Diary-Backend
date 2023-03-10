const AppError = require("../../../utils/AppError");
const { catchAsyncErrors } = require("../../../utils/catchAsync");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../../utils/sendEmail');

// Sign Up user
const signup = catchAsyncErrors(async(req , res , next)=>{
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        let newUser = new userModel(req.body);
        await newUser.save();
        const html = `<a href = "${req.protocol}://${req.headers.host}/api/v1/users/confirmEmail/${newUser._id}">Click Here To Confirm Email</a?`;
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
    await userModel.findByIdAndUpdate(userId, { emailConfirmed: true });
    res.json({ message: "Email Has been Confirmed Successfully", })
})


module.exports = {
    signup,
    confirmEmail
}