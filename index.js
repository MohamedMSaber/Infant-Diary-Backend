const express = require('express')
const dbConnection = require('./src/database/dbConnection')
require('dotenv').config({path:'./config/.env'})
const morgan = require('morgan');
const cors= require('cors');
const indexRouter = require('./src/index.router')
const globalMiddleware = require("./src/utils/GolbalMiddleware");
const AppError = require('./src/utils/AppError');
const app = express()
const port = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({}));

if (process.env.MODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}else {
    app.use(morgan("production"))
}




app.use("/api/v1" , indexRouter.authRouter)
app.use("/api/v1/parent", indexRouter.parentRouter)
app.use("/api/v1/admin", indexRouter.adminRouter)
app.use("/api/v1/announcement", indexRouter.announcementRouter)
app.use("/api/v1/question", indexRouter.questionRouter)
app.use("/api/v1/post", indexRouter.postRouter)
app.use("/api/v1/comment", indexRouter.commentRouter)
app.use("/api/v1/clinic", indexRouter.clinicRouter)
app.use("/api/v1/hospital", indexRouter.hospitalRouter)
app.use("/api/v1/information", indexRouter.informationRouter)
app.use("/api/v1/service", indexRouter.serviceRouter)
app.use("/api/v1/standard", indexRouter.standardRouter)
app.use("/api/v1/vaccine", indexRouter.vaccineRouter)

app.all('*', (req, res,next) =>{
    next(new AppError(`Route : ${req.originalUrl} not found on Server`, 404));
})

//global errorHandler middleware
app.use(globalMiddleware)
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))