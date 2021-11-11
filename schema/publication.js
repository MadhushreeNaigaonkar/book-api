const mongoose =require('mongoose');

//Authorschema
const PublicationSchema= mongoose.Schema({
    id:{
        type: Number,
        required: true,

    },
    name: String,
    books:[String],
    
});

//Publication Model
const PublicationModel=mongoose.model("publiction",PublicationSchema);
module.exports = PublicationModel;