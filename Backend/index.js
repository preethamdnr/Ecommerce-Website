const express= require('express')
const mongoose = require('mongoose');
const cors= require('cors')
const userdetailsModel= require('./models/userdetails')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/userdetails');

app.post('/Login',(req,res)=>{
    const{email,password}=req.body;
    userdetailsModel.findOne({email:email})
    .then(user =>{
        console.log(user)
        if(user){
            if(user.password===password){
                res.status(200).json("Success")
            }else{
                res.status(404).json("The password is incorrect")
            }
        }else{
            res.status(404).json("No record exist")
        }
    })
})

app.post('/Signup',(req,res)=>{
    userdetailsModel.create(req.body)
    .then(userdetails => res.status(200).json(userdetails))
    .catch(err => res.status(404).json(err))
})

app.listen(3001,()=>{
    console.log('Server is running preetham')
})