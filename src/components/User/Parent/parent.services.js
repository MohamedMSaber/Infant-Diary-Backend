const { catchAsyncErrors } = require("../../../utils/catchAsync");
const parentModel = require("./parent.model");

exports.getUser = catchAsyncErrors(async (req,res)=>{
    const parentID = req.user._id;
    const user = await parentModel.findOne(parentID);
    res.status(200).json(user);
})

//get All Parent
exports.getAllParent = catchAsyncErrors(async (req,res)=>{
    const Parents = await parentModel.find();
    res.status(200).json(Parents);
});




