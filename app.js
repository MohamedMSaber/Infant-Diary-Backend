const express = require('express')
const dbConnection = require('./src/database/dbConnection')
require('dotenv').config({path:'./config/.env'})
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
const indexRouter = require('./src/index.router')

// app.use("api/v1/parent" , indexRouter.parentRouter)
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))