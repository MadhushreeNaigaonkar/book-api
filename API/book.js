

const Router= require('express').Router();

const Book =require("../schema/book");
const Author =require("../schema/author");


// Route:/book
// Des:To getall book
// Access:Public
// Method:get
//Params:none
//Body:none

Router.get("/books",async(req,res) => {
    const getAllBooks= await Book.find();
    return res.json (getAllBooks);
});

// Route:/book/:BookId
// Des:To get book based on isbn
// Access:Public
// Method:get
//Params:BookId
//Body:none
Router.get("/book/:BookId",async(req,res) =>{
    const getSpecificBook= await Book.findOne({ISBN : req.params.BookId});
    if(!getSpecificBook){
        return res.json({error: `No Book Found for ISBN ${req.params.BookId}`});
    }
    return res.json({book: getSpecificBook});
});

// Route:/book/c/:cat
// Des:To get book based on category
// Access:Public
// Method:get
//Params:category
//Body:none
Router.get("/book/c/:cat",async (req,res) =>{
    const getSpecificBook = await BookModel.find({category:req.params.cat});
    if(!getSpecificBook){
        return res.json({error:`No book found`});

    }
    return res.json({books:getSpecificBook});
    });

// Route:/book/d/:authid
// Des:To get book based on author
// Access:Public
// Method:get
//Params:authorid
//Body:none
Router.get("/book/a/c/:authid",(req,res) =>{
    const getBook = Database.Book.filter(
        (book)=> book.authors.includes (parseInt((req.params.authid))));

    return res.json({book:getBook});
    });

    // Route:/book/new
    // Des:To add a new book
    // Access:Public
    // Method:post
    //Params:none
    //Body:book details
    Router.post("/book/new",async(req,res) =>{
     try {
        const {newBook}= req.body;
        if(newBook.ISBN){
            
        }
        await Book.create(newBook);
        return res.json({message:"Book Added"});
       
     } catch (error) {
         return res.json({error: error.message});
         
     }
    });
    
// Route:/book/update/:isbn
// Des:To update title book
// Access:Public
// Method:put
//Params:isbn
//Body:updations

Router.put("/book/update/:isbn",async(req,res) => {
    const {title} = req.body.title;
    const updatedBook = await Book.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            title:title,
        },
        {
            new:true,
        },
    );

    return res.json({ book: updatedBook});
});



// Route       /book/updateAuthor/:isbn
// Description update/add new author to a book
// Access      Public
// Paramteters isbn
// Method      put
Router.put("/book/updateAuthor/:isbn", async (req,res) => {
    const { newAuthor } = req.body;
    const { isbn } = req.params;
    const { updatedBook } = await Book.findOneAndUpdate(
        {
            ISBN : isbn,
        },
        {
            $addToSet:{
                authors: newAuthor,

            }, 
        
        },
        {
            new: true,
        },

    );

    const {updatedAutor} = await Author.findOneAndUpdate(
        {
            id:newAuthor,
        
        },
        {
            $addToSet:{
                books:isbn,
            },
        },
        {
            new: true,
        },
    );
    return res.json({ books:updatedBook ,
    authors:updatedAutor,
    message:'Author updated'
    });
});
// Route       /book/delete/:isbn
// Description delete a book
// Access      Public
// Paramteters isbn
// Method      DELETE
Router.delete("/book/delete/:isbn",async (req,res)=>{
    const { isbn } =req.params;
    const updatedBookDatabase = await Book.findOneAndDelete({
        ISBN: isbn
    })
    return res.json({books: updateBookDatabase});

});

// Route       /book/delete/author/:id/:isbn
// Description delete author from book
// Access      Public
// Paramteters id ,isbn
// Method      DELETE
Router.delete("/book/delete/author/:id/:isbn",async (req,res)=>{
    const { id , isbn } =req.params;
    
    const updateBook=await Book.findOneAndUpdate({
        ISBN : isbn
    },
    {
        $pull:{
            authors: parseInt(id),
        } ,
    },
     {
         new: true,

       });
    const updateAuthor= await Author.findOneAndUpdate({
        id: parseInt(id)
    },
    {
        $pull:{
            books:isbn,
        },},
        {
            new:true
    });




    return res.json({message:`Author was deleted`,book: updateBook,author: updateAuthor});
});

module.exports=Router;