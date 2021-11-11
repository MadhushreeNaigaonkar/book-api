const mongoose =require('mongoose');

//Bookschema
const BookSchema= mongoose.Schema({
    ISBN:{
        type: String,
        required: true,

    },
    title:{
        type:String,
        required:true,

    },
        authors:[Number],
        language: String,
        pubDate: Number,
        numOfPage:Number,
        category: [String],
        publication:Number,
});

//BookModel
const BookModel=mongoose.model("book",BookSchema);
module.exports = BookModel;
