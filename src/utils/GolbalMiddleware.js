module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    if(process.env.MODE_ENV == 'devolpment'){
        devMode(err,res);
    }
    else{
        proMode(err,res);
    }
}

let devMode = (err,res)=>{
        res.status(err.statusCode).json({status: err.statusCode , message: err.message , stack: err.stack});
        
}
   

let proMode = (err,res)=>{
        res.status(err.statusCode).json({status: err.statusCode , message: err.message });
}