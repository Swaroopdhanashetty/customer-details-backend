const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/customerDB'
const cors = require("cors")
const bodyParser = require("body-parser");


const app = express()

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...');
})

app.get('/',(req,res) => res.send("hi"))


const port = 9000

app.use(express.json())
app.use(cors());
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const custRouter = require('./routers/customers')

app.use('/customers',custRouter)


app.listen(port ,() => {
    console.log('Server started');
})