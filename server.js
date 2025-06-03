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
    const data={username : req.body.name ,password : req.body.pass};
    console.log(data);
    const user=await collection.findOne({userName : data.username});
    console.log(user);
    if(!user){
        console.log("User not found");
        return res.send({status:'unf'});
    }
    // const pcheck = localeCompare(data.pass,user.pass);
    // console.log(pcheck);
    if(data.password!=user.password){
        console.log("invalid password");
        return res.send({status:'wp'});
    }
    console.log(`${data.username} has been signed in`);
    return res.send({status:'s'});
});

app.post('/signup',async(req,res)=>{
    console.log("new data received");
    const data={userName : req.body.name,password : req.body.pass,email:req.body.mail,userId:-1};
    console.log(data);
    const check=await collection.findOne({email: data.email});
    if(check){
        console.log(`existing mail in mail ${data.email}`);
       return  res.send({status:'em'});
    }
    const len=await collection.countDocuments();
    data.userId=10000+len;
    const newUser = new collection(data);
    await newUser.save();
    const ext=data.email.slice(-8);
    console.log(`${data.userName} logged in `);
    if(ext==="@lib.com"){
        await collection.updateOne(
            { email: data.email },  
            { $set: { admin: true } } );
        console.log("user has admin privilages");
    }
    return  res.send({status:'s'});
})

// app.post('/users',async (req,res)=>{
//     try{
//         const {userId,userName,email}=req.body;

//         if(!userId || !userName || !email){
//             return res.status(400).send("Missing UserName,UserId,Email");
//         }
//         const customUser={
//            ... req.body,
//            admin:email.slice(-8)=="@lib.com"?true:false,
//         };

//         const newUser=new User(customUser);
//         await newUser.save();
//         res.status(201).send(newUser);
//     }
//     catch(error){
//         res.status(400).send(error.message);
//     }
// })

app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
})
