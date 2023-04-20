const multer = require('multer');
const AppError = require('./AppError');

let options = (folderName)=>{
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new AppError("Images Only", 400), false)
        }
    }
    const upload = multer({ storage: storage, fileFilter: fileFilter })
    return upload;
}

exports.uploadingSingleFile=(filedName , folderName) => options(folderName).single(filedName);
exports.uploadingMultiFile = (fildesArray, folderName) => options(folderName).fields(fildesArray);
