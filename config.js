const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/library");

connect
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });

const BookSchema = new mongoose.Schema({
  BookID: {
    type: Number,
    required: true,
    unique: true,
  },
  BookName: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Publication: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  TotalBooks: {
    type: Number,
    required: true,
  },
  NoOfStockAvailable: {
    type: Number,
    required: true,
  },
  NoOfBooksTaken: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Book = mongoose.model("Book", BookSchema);

const userSchema=new mongoose.Schema({
  userId:{
    type:Number,
    required:true,
    unique:true
  },
  userName:{
    type:String,
    required:true,
  },
  fine:{
    type:Number,
    default:0
  },
  member:{
    type:Boolean,
    default:false,
  },
  noOfBooksBorrowed:{
    type:Number,
    default:0
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    trim: true
  },
  admin:{
    type:Boolean,
    default:false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {Book,User};
