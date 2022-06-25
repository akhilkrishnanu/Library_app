var express = require("express");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const users = require("./src/models/usersModel");
const books = require("./src/models/booksModel");
const path = require('path');
var cors = require("cors");
const App =express();

//Express Middlewares
App.use(express.json());
App.use(express.urlencoded({extended:true}));
App.use(cors());
App.use(express.static('./dist/library-app'));

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
App.listen(process.env.PORT || port,(err)=>{
    if(err){console.log("err")}
    else{console.log("Connected to server")}
});

function verifyToken(req,res,next){
    if(!req.headers.authorization)
    {
        return res.status(401).send("UnAuthorized Request")

    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === "null")
    {
        return res.status(401).send("UnAuthorized Request")
    }
    let payload = jwt.verify(token,"secretkey")
    if(!payload)
    {   
        return res.status(401).send("UnAuthorized Request");
        
    }
    req.userId = payload.subject;
    console.log(req.userId);
    next();
}

//USER ROUTES

// App.route("/getusers")
App.route("/api/getusers")
.get((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
users.find({},{_id:0,username:1})
.then(data=>{
    res.send(data);
})
});

// App.route("/signup")
App.route("/api/signup")
.post((req,res)=>{
 res.header("Access-Control-Allow-Origin","*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
var user ={
    username: req.body.user.username,
    password: req.body.user.password
}    
console.log(user)
var user = new users(user);
user.save();
})
.get((req,res)=>{
    res.send("Hello")
})

// App.route("/login")
App.route("/api/login")
.post((req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH");
    let name = req.body.user.username;
    let password = req.body.user.password;
    users.findOne({username:req.body.user.username, password:req.body.user.password},(err,user)=>{
        if(err)
        console.log(err)
        if(user)
        {
            let payload = {subject:name+password};
            let token = jwt.sign(payload,"secretkey");
            console.log(token);
            res.status(200).send({token});
        }
        else
        res.status(401).json({
            message:"Invalid credentials"
        });
    });
})

//BOOK ROUTES

//get all the books
App.route("/api/getbooks")
.get(verifyToken, (req,res)=>{
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
App.route("/api/getbook/:id")
.get(verifyToken, (req,res)=>{
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
App.route("/api/addbook")
.post(verifyToken, (req,res)=>{
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
App.route("/api/updatebook")
.put(verifyToken, (req,res)=>{
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
App.route("/api/deletebook/:id")
.delete(verifyToken, (req,res)=>{
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

App.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/library-app/index.html'));
});