const slugify = require("slugify")
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')


const deleteFun = (Model) => {
    return catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    let document = await Model.findByIdAndDelete(id);
    if (!document) {
        return next(new AppError(`document Not Found To Delete`, 404));
    }
    res.status(200).json({ message: `document has Been Deleted`  , document});
})
}




module.exports = {
    deleteFun
}