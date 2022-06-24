const mongoose = require("mongoose");

const schema = mongoose.Schema;

const BookSchema = new schema({

    authorName: String,
    bookName: String,
    bookImg: String,
    bookInfo:String,
});

const books = mongoose.model('books',BookSchema);
module.exports= books;