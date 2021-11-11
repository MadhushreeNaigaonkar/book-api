const mongoose =require('mongoose');

//Authorschema
const AuthorSchema= mongoose.Schema({
    id:{
        type: Number,
        required: true,

    },
    name: String,
    books:[String],
    
});

//AuthorModel
const AuthorModel=mongoose.model("author",AuthorSchema);
module.exports = AuthorModel;