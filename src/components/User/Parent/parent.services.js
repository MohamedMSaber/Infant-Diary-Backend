const { catchAsyncErrors } = require("../../../utils/catchAsync");
const parentModel = require("./parent.model");
//get User Info
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
//update parent profile
exports.updateParentProfile = catchAsyncErrors(async (req,res)=>{
    const parentID = req.user._id;
    const Parent = await parentModel.findById(parentID);
    if (Parent) {
        const updatedParent = await parentModel.findByIdAndUpdate(parentID, req.body, { new: true });
        res.status(200).json({ updatedParent, message: "your profile has been updated" });
    } else {
        res.status(404).json({ message: "can not update your profile" })
    }
});




