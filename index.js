const express = require("express");

// database
const Database = require("./database");

// initialization
const OurAPP = express();

OurAPP.use(express.json());

OurAPP.get("/", (request, response) => {
    response.json({ message: "Server is working!!!!!!" });
});

// Route:/book
// Des:To getall book
// Access:Public
// Method:get
//Params:none
//Body:none

OurAPP.get("/book",(req,res) => {
    return res.json ({book:Database.Book});
});
// Route:/book/:BookId
// Des:To get book based on isbn
// Access:Public
// Method:get
//Params:BookId
//Body:none
OurAPP.get("/book/:BookId",(req,res) =>{
    const getBook = Database.Book.filter(
        (book) => book.ISBN === req.params.BookId);

    
    return res.json({book:getBook});
});

// Route:/book/c/:cat
// Des:To get book based on category
// Access:Public
// Method:get
//Params:category
//Body:none
OurAPP.get("/book/c/:cat",(req,res) =>{
    const getBook = Database.Book.filter(
        (book)=> book.category.includes(req.params.cat));

    return res.json({book:getBook});
    });
OurAPP.listen(4000, ()=> console.log("Server is running"));