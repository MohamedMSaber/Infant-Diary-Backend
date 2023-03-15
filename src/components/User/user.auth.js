const { catchAsyncErrors } = require('../../utils/catchAsync');
const parentModel = require('./Parent/parent.model')
const doctorModel = require('./Doctor/doctor.model');
const sendEmail = require('../../utils/sendEmail');
const AppError = require('../../utils/AppError');



const signup = catchAsyncErrors(async(req , res , next)=>{
    let {userType} = req.params;
    let user ;
    let newModel;
    // console.log(model);
    if (userType !== 'parent' && userType !== 'doctor') {
        return next(new AppError("Invalid user type"));
    }
    else {
        if (userType === 'parent') {
            newModel = parentModel;
        } else {
            newModel = doctorModel;
        }
    }
    user =  await newModel.findOne({ email: req.body.email });
    if (!user) {
        let newUser = new newModel(req.body);
        await newUser.save();
        const html = `<a href = "${req.protocol}://${req.headers.host}/api/v1/${userType}/confirmEmail/${newUser._id}">Click Here To Confirm Email</a?`;
        sendEmail(newUser.email , html )
        console.log(newUser);
        res.status(200).json({ Email:newUser.email , message :  "Sign Up Successfully ...plz confirm your EMAIL..." });
    }

    else {
        return next(new AppError(`User Already Exist`, 400));
    }
})




module.exports = {
    signup
}