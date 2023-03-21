const express = require('express')
const dbConnection = require('./src/database/dbConnection')
require('dotenv').config({path:'./config/.env'})
const morgan = require('morgan');
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
const indexRouter = require('./src/index.router')
const globalMiddleware = require("./src/utils/GolbalMiddleware");
const AppError = require('./src/utils/AppError');

if (process.env.MODE_ENV === 'devolpment') {
    app.use(morgan('dev'));
}


app.use("/api/v1" , indexRouter.authRouter)
app.use("/api/v1/parent", indexRouter.parentRouter)
app.use("/api/v1/admin", indexRouter.adminRouter)

app.use("/api/v1/announcement", indexRouter.announcementRouter)

app.use("/api/v1/question", indexRouter.questionRouter)

app.use("/api/v1/post", indexRouter.postRouter)

app.use("/api/v1/comment", indexRouter.commentRouter)

app.all('*', (req, res,next) =>{
    next(new AppError(`Route : ${req.originalUrl} not found on Server`, 404));
})

//global errorHandler middleware
app.use(globalMiddleware)
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))