const express=require('express');
const path=require('path');
const body_parse=require('body-parser');
const cors=require("cors")

const app=express();
const port =3000;

app.use(express.json());
app.use(cors());

app.post('/signin',(req,res)=>{
    console.log("data recieved");
    const {name,pass}=req.body;
    console.log(`${name} has been signed in`);
    res.send({status:true});
});

app.post('/signup',(req,res)=>{
    console.log("new data received");
    const {name,mail,pass}=req.body ;
    console.log(`${name} logged in `);
    res.send({status:true});
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