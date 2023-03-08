const mongoose = require('mongoose');

const dbConnection=()=>{
    mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log('DB connection is stablished SUCCESSFULLY');
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports= dbConnection;





