import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose'
import bookRouter from './routes/bookRouter.js'

//define app
const app = express()

//define global variable
dotenv.config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//difine cors
app.use(cors({
    origin: process.env.ORIGIN.split(" "),
    methods: "GET"
}))

//routers
app.use("/bookstore/v1", bookRouter)

app.get('/', async(req, res)=>{
    res.status(200).send('this is bookstore server')
})

//app starting and connecting database
mongoose.connect(DATABASE_URL)
    .then(()=>{
        console.log('database connected')
        app.listen(PORT, ()=>{
            console.log(`app started listen on ${PORT}`)    
        })
    })
    .catch(err=>{
        console.log(err)
    })