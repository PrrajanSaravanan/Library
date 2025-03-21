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
    const ext=mail.substr(mail.length-8);
    console.log(`extension ${ext}`);
    console.log(`${name} logged in `);
    res.send({status:true});
})

app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
})