const slugify = require("slugify")
const AppError = require('../../utils/AppError')
const { catchAsyncErrors } = require('../../utils/catchAsync')


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
const updateFun = (Model) => {
    return catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    let document = await Model.findByIdAndUpdate(id,req.body,{new:true});
    if (!document) {
        return next(new AppError(`document Not Found To Update`, 404));
    }
    res.status(200).json({ message: `document has Been Updated`  , document});
})
}

const getSpecficFun = (Model) => {
    return catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    let document = await Model.find({_id:id});
    if (!document) {
        return next(new AppError(`No document Found `, 404));
    }
    res.status(200).json({ message: `Document `  , document});
})
}

const getAllFun = (Model) => {
    return catchAsyncErrors(async (req, res,next) => {
    let documents = await Model.find();
    if (!documents) {
        return next(new AppError(`No documents Found `, 404));
    }
    res.status(200).json({ message: `Documents `  , documents});
})
}




module.exports = {
    deleteFun,
    updateFun,
    getAllFun,
    getSpecficFun
}