const express = require("express");

// database
const Database = require("./database");

// initialization
const OurAPP = express();

//using json() for post()
OurAPP.use(express.json());

//checking for root and server
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



// Route:/book/d/:authid
// Des:To get book based on author
// Access:Public
// Method:get
//Params:authorid
//Body:none
OurAPP.get("/book/a/c/:authid",(req,res) =>{
    const getBook = Database.Book.filter(
        (book)=> book.authors.includes (parseInt((req.params.authid))));

    return res.json({book:getBook});
    });



// Route:/author
// Des:To get all author
// Access:Public
// Method:get
//Params:none
//Body:none
OurAPP.get("/author",(req,res) => {
    return res.json ({book:Database.Author});
});



// Route:/author/authid
// Des:To get a specific author
// Access:Public
// Method:get
//Params:authid
//Body:none
OurAPP.get("/author/:authid",(req,res)=>
{
    const getAuth = Database.Author.filter(
        
        (author) => author.id.toString() === req.params.authid);

    
    return res.json({author:getAuth});
});



// Route:/publication
// Des:To get all publication
// Access:Public
// Method:get
//Params:none
//Body:none


OurAPP.get("/publication",(req,res) => {
    return res.json ({book:Database.Publication});
});

// Route:/publication/pid
// Des:To get specific publication
// Access:Public
// Method:get
//Params:pubid
//Body:none


OurAPP.get("/publication/p/:pid",(req,res)=>
{
    const getPub = Database.Publication.filter(
        
        (publication) => publication.id.toString() === req.params.pid);

    
    return res.json({publication:getPub});
});

// Route:/book/new
// Des:To add a new book
// Access:Public
// Method:post
//Params:none
//Body:book details
OurAPP.post("/book/new",(req,res) =>{
    console.log(req.body);
    return res.json({message:'Book Added Successfully'});
});

// Route:/author/new
// Des:To add a new author
// Access:Public
// Method:post
//Params:none
//Body:book details
OurAPP.post("/author/new",(req,res) =>{
    const {newAuthor}=req.body;
    console.log(newAuthor);
    return res.json({message:'Author was added'});
});

// Route:/publication/new
// Des:To add a new publicaion
// Access:Public
// Method:post
//Params:none
//Body:book details
OurAPP.post("/publication/new",(req,res) =>{
    const {newPublication}=req.body;
    console.log(newPublication);
    return res.json({message:'Publication was added'});
});
OurAPP.listen(4000, ()=> console.log("Server is running"));
