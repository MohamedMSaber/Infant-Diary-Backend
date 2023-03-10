// Catch Asyn Errors
module.exports.catchAsyncErrors=(fn)=> {
    return (req, res, next) => {
        fn(req, res , next).catch((error) => {
            next(error);
        })
    }
}