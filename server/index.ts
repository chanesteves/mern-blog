import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import routes from './routes/api'

// Middlewares
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())


// Routes
app.use('/api/auth', routes.authRouter)

// Database
import "./dependencies/mongoose"

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})