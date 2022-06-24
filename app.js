var express = require("express");
var mongoose = require("mongoose");
const users = require("./src/models/usersModel");
const books = require("./src/models/booksModel");

var cors = require("cors");
const App =express();

//Express Middlewares
App.use(express.json());
App.use(express.urlencoded({extended:true}));
App.use(cors());

//port
const port=3000;

//connection to MongoDB using mongoose
const mongodbAtlas = "mongodb+srv://akhilku1:happyonam@cluster1.wvfjw.mongodb.net/?retryWrites=true&w=majority"
const mongodb = "mongodb://localhost:27017/library";
mongoose.connect(mongodbAtlas || mongodb,{useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;
db.on("error",console.error.bind(console,'connection error'));
db.once("open",()=>{
    console.log("connected to DB")
});

//connection to server
App.listen(port,(err)=>{
    if(err){console.log("err")}
    else{console.log("Connected to server")}
});

//routes
//get all the books
App.route("/getbooks")
.get((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
 books.find({},(err,books)=>{
    if(err)
    console.log(err)
    else
    {
        res.status(201).send(books);

    }
 })
});

//get a book
App.route("/book/:id")
.get((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
 let bookid = req.params.id;
 books.findOne({"_id":bookid},(err,book)=>{
    if(err)
    console.log(err)
    else
    {
        res.status(201).send(book);
    }
    

 })
});

//add a book
App.route("/addbook")
.post((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
var newBook = {
    authorName: req.body.book.authorName,
    bookName: req.body.book.bookName,
    bookImg: req.body.book.bookImg,
    bookInfo:req.body.book.bookInfo
}
var book = new books(newBook);
book.save((err,data)=>{
    if(err)
    console.log(err)
    else
    res.send(data)
});
});

//update a book
App.route("/updatebook")
.put((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
 var bookid = req.body.bookid;
 var updatedBook ={
    authorName: req.body.book.authorName,
    bookName: req.body.book.bookName,
    bookImg: req.body.book.bookImg,
    bookInfo:req.body.book.bookInfo
 }
 books.findByIdAndUpdate({"_id":bookid},{$set:updatedBook},(err,data)=>{
if(err)
console.log(err)
else
res.send(data);
 })
});

//deletebook
App.route("/deletebook/:id")
.delete((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
 let bookid = req.params.id;
 books.findOneAndDelete({"_id":bookid},(err,book)=>{
    if(err)
    console.log(err)
    else
    {
        res.send(book);
    }
    

 })
});
//getusers
//getuser