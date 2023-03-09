const mongoose = require('mongoose');

const dbConnection=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log('DB is CONNECTED...');
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports= dbConnection;





