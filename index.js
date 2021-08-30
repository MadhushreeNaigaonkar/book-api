require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
// database
const Database = require("./database");



mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log ("connection established"))
.catch((err) => {
    console.log(err);
});
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
    const {newBook}= req.body;
    Database.Book.push(newBook)
    return res.json(Database.Book);
});

// Route:/author/new
// Des:To add a new author
// Access:Public
// Method:post
//Params:none
//Body:book details
OurAPP.post("/author/new",(req,res) =>{
    const {newAuthor}=req.body;
    Database.Author.push(newAuthor)
    return res.json(Database.Author);
});

// Route:/publication/new
// Des:To add a new publicaion
// Access:Public
// Method:post
//Params:none
//Body:book details
OurAPP.post("/publication/new",(req,res) =>{
    const {newPublication}=req.body;
    Database.Publication.push(newPublication)
    return res.json(Database.Publication);
});

// Route:/book/update/:isbn
// Des:To update in exisiting book
// Access:Public
// Method:put
//Params:isbn
//Body:updations

OurAPP.put("/book/update/:isbn",(req,res) => {
    const {updatedBook} = req.body;
    const{isbn} =req.params;

    Database.Book.forEach((book) =>{
        if(book.ISBN===isbn){
            book.title = updatedBook.title;
            return ;
        }
        return book;

    });

    return res.json(Database.Book);
});



// Route       /book/updateAuthor/:isbn
// Description update/add new author to a book
// Access      Public
// Paramteters isbn
// Method      put
OurAPP.put("/book/updateA/:isbn", (req, res) => {
    const { newAuthor } = req.body;
    const { isbn } = req.params;
    // updating book database object
    Database.Book.forEach((book) => {
        // check if ISBN match
        if (book.ISBN === isbn) {
            // check if author already exist
            if (!book.authors.includes(newAuthor)) {
                // if not, then push new author
               book.authors.push(newAuthor);
               return book;
            }
            // else return
            return book;
        }
        return book;
    });
    // updating author Database object
    Database.Author.forEach((author) => {
        // check if author id match
        if (author.id === newAuthor) {
            // check if book already exist
            if (!author.books.includes(isbn)) {
                // if not, then push new book
                author.books.push(isbn);
                return author;
            }
            // else return
            return author;
        }
        return author;
    });
    return res.json({ book: Database.Book, author: Database.Author });
});


// Route:/author/update/:id
// Des:To update in exisiting author
// Access:Public
// Method:put
//Params:id
//Body:updations

OurAPP.put("/author/update/:id",(req,res)=>{
    const {updatedAutor}=req.body;
    const {id}=req.params;

    Database.Author.forEach((author)=>{
        if(author.id === parseInt(id)) {
            author.name = updatedAutor.name;   
            return;    
         }
            return author;
    });

    return res.json(Database.Author);
});

// Route:/publication/update/:id
// Des:To update in exisiting publication
// Access:Public
// Method:put
//Params:id
//Body:updations

OurAPP.put("/publication/update/:id" ,(req,res) =>{
    const {newPublication} = req.body;
    const {id} = req.params;

    const publication = Database.Publication.forEach((publication) =>{
        if(publication.id === parseInt(id)){
            publication.name= newPublication.name;
           return ;
        }
        return publication;
    });
    return res.json(Database.Publication);
});


// Route       /author/updateBook/:id
// Description update/add new book to author
// Access      Public
// Paramteters id
// Method      put

OurAPP.put("/author/updateBook/:id", (req, res) => {
    const { newBook } = req.body;
    const { id } = req.params;
    Database.Author.forEach((author) => {
       
        if (author.id === parseInt(id)) {
            
            if (!author.books.includes(newBook)) {
               
                author.books.push(newBook);
               return author;
            }
           
            return author;
        }
        return author;
    });
   
    Database.Book.forEach((book) => {
        
        if (book.ISBN === newBook) {
            if (!book.authors.includes(parseInt(id))) {
                
                book.authors.push(parseInt(id));
                return book;
            }
           
            return book;
        }
        return book;
    });
    return res.json({ book: Database.Book, author: Database.Author });
});


// Route       /publication/updateBook/:id
// Description update/add new book to publiction
// Access      Public
// Paramteters id
// Method      put

OurAPP.put("/publication/updateBook/:id", (req, res) => {
    const { newBook } = req.body;
    const { id } = req.params;
    Database.Publication.forEach((publication) => {
       
        if (publication.id === parseInt(id)) {
            
            if (!publication.books.includes(newBook)) {
               
                publication.books.push(newBook);
               return publication;
            }
           
            return publication;
        }
        return publication;
    });
   
    Database.Book.forEach((book) => {
        
        if (book.ISBN === newBook) {
            if (!book.publication===(parseInt(id))) {
                
               Database.Book.publication = parseInt(id);
                return book;
            }
           
            return book;
        }
        return book;
    });
    return res.json({ book: Database.Book, publication: Database.Publication });
});

// Route       /book/delete/:isbn
// Description delete a book
// Access      Public
// Paramteters isbn
// Method      DELETE
OurAPP.delete("/book/delete/:isbn",(req,res)=>{
    const { isbn } =req.params;

    const filteredBook= Database.Book.filter((book)=> book.ISBN !==isbn);
    Database.Book = filteredBook;
    return res.json(Database.Book);

});

// Route       /author/delete/:id
// Description delete a author
// Access      Public
// Paramteters id
// Method      DELETE
OurAPP.delete("/author/delete/:id",(req,res)=>{
    const { id } =req.params;

    const filteredAuthor= Database.Author.filter((author)=> author.id !== parseInt(id));
    Database.Author = filteredAuthor;
    return res.json(Database.Author);

});

// Route       /publication/delete/:id
// Description delete a publication
// Access      Public
// Paramteters id
// Method      DELETE
OurAPP.delete("/publication/delete/:id",(req,res)=>{
    const { id } =req.params;

    const filteredPublication= Database.Publication.filter((publication) => publication.id !== parseInt(id));
    Database.Publication = filteredPublication;
    return res.json(Database.Publication);

});

// Route       /book/delete/author/:id/:isbn
// Description delete author from book
// Access      Public
// Paramteters id ,isbn
// Method      DELETE
OurAPP.delete("/book/delete/author/:id/:isbn",(req,res)=>{
    const { id , isbn } =req.params;
    Database.Book.forEach((book)=>{
        if(book.ISBN === isbn){
            if(!book.authors.includes(parseInt(id))){
                return book;
            }
            book.authors= book.authors.filter((databaseid)=> databaseid !== parseInt(id));
            return book;
        }
        return book;
    })
    Database.Author.forEach((author) =>{
        if(author.id === parseInt(id)){
            if(!author.books.includes(isbn)){
            return author;
        }
        author.books= author.books.filter((book)=> book!==isbn);
        return author;
    }
    return author;
});
    return res.json({book: Database.Book ,author: Database.Author});
});


// Route       /publication/delete/book/:id/:isbn
// Description delete book from publication
// Access      Public
// Paramteters id ,isbn
// Method      DELETE
OurAPP.delete("/publication/delete/book/:id/:isbn",(req,res)=>{
    const { id , isbn } =req.params;
    
    Database.Book.forEach((book) =>{
        if(book.ISBN === isbn){
            book.publication=0;
            return book;
    }
    return book;
});
   Database.Publication.forEach((publication)=>{
       if(publication.id === parseInt(id)){
           const filteredBooks= publication.books.filter(
               (book) => {book!== isbn});
               publication.books = filteredBooks;
               return publication;
       }
       return publication;
   });
   return res.json({publication:Database.Publication,book:Database.Book});
});

OurAPP.listen(4000, ()=> console.log("Server is running"));
