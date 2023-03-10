const express = require('express')
const dbConnection = require('./src/database/dbConnection')
require('dotenv').config({path:'./config/.env'})
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
const indexRouter = require('./src/index.router')
const globalMiddleware = require("./src/utils/GolbalMiddleware")
if (process.env.MODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}


app.use("api/v1/parent" , indexRouter.parentRouter)
app.all('*', (req, res,next) =>{
    next(new AppError(`Route : ${req.originalUrl} not found on Server`, 404));
})
//global errorHandler middleware
app.use(globalMiddleware)
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))