const express=require('express');
const path=require('path');
const body_parse=require('body-parser');
const cors=require("cors");
const bcrypt = require('bcrypt');
const collection = require("./config");

const app=express();
const port =3000;

app.use(express.json());
app.use(cors());

app.post('/signin',async(req,res)=>{
    console.log("data recieved");
    const data={name : req.body.name ,pass : req.body.pass};
    const user=await collection.findOne({userName : data.name});
    if(!user){
        console.log("User not found");
        res.send({status:'unf'});
    }
    const pcheck = await bcrypt.compare(data.pass,user.pass);
    if(!pcheck){
        console.log("invalid password");
        res.send({status:'wp'});
    }
    console.log(`${data.name} has been signed in`);
    res.send({status:'s'});
});

app.post('/signup',async(req,res)=>{
    console.log("new data received");
    const data={name : req.body.name,pass : req.body.pass,mail:req.body.mail};
    const check=await collection.findOne({email: data.mail});
    if(check){
        console.log("existing mail");
        res.send({status:'em'});
    }
    // collection.insertOne(data);
    const newUser = new collection(data);
    await newUser.save();
    console.log(`${data.name} logged in `);
    res.send({status:'s'});
})

app.post('/users',async (req,res)=>{
    try{
        const {userId,userName,email}=req.body;

        if(!userId || !userName || !email){
            return res.status(400).send("Missing UserName,UserId,Email");
        }
        const customUser={
           ... req.body,
           admin:email.slice(-8)=="@lib.com"?true:false,
        };

        const newUser=new User(customUser);
        await newUser.save();
        res.status(201).send(newUser);
    }
    catch(error){
        res.status(400).send(error.message);
    }
})

app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
})