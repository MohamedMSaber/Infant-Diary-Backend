const { catchAsyncErrors } = require("../../../utils/catchAsync");
const parentModel = require("./parent.model");

exports.getUser = catchAsyncErrors(async (req,res)=>{
    const parentID = req.user._id;
    const user = await parentModel.findById(parentID);
    res.status(200).json(user);
})