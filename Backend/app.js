var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
const App =express();

const port=3000;

const mongodb = "mongodb://localhost:27017/blog";
mongoose.connect(mongodb,{useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error'));
db.once("open",()=>{
    console.log("connected to DB")
});


App.listen(port,(err)=>{
    if(err){console.log("err")}
    else{console.log("Connected to server")}
});