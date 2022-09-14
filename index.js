const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const socketio = require('socket.io')
const cors = require('cors')
const connectDB =  require('./config/connectDB')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')

//middleware
dotenv.config({ path : './config/config.env'})
const PORT = process.env.PORT
app.use(morgan('dev'))
connectDB()
app.use(express.urlencoded ({ extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use('/', require('./routes/router'))

app.listen(PORT, ()=>{console.log(`server running on http://localhost:${PORT}`)})