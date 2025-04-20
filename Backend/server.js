const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

// Load environment variables
require('dotenv').config()

const PORT = process.env.PORT || 3500

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

// MongoDB connection event listeners
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`)
})