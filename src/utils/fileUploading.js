const multer = require('multer');
const AppError = require('./AppError');

let options = (folderName)=>{
    const storage = multer.diskStorage({}
    //     destination: function (req, file, cb) {
    //         cb(null, `Uploads/${folderName}`)
    //     },
    //     filename: function (req, file, cb) {
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //         cb(null, uniqueSuffix + '-' + file.originalname)
    //     }
    
    )
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
