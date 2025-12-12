const express=require('express');
const path=require('path');

const app=express();
const port=5000; 

app.use(express.json());
app.use(express.static(path.join(__dirname)));
console.log('1');
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'signin.html'));
}) 

app.listen(port,(req,res)=>{
    console.log(`client is running on http://localhost:${port}`);
})
