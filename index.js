require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');

//API
const BookAPI = require("./API/book");
const AuthorAPI= require("./API/author");
const PublicationAPI= require("./API/publication");


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log ("connection established"))
.catch((err) => {
    console.log(err);
});
// initialization
const OurAPP = express();

//using json() for post()
OurAPP.use(express.json());

OurAPP.use("/"  ,BookAPI);
OurAPP.use("/" ,AuthorAPI);
OurAPP.use("/" ,PublicationAPI);

//checking for root and server
OurAPP.get("/", (request, response) => {
    response.json({ message: "Server is working!!!!!!" });
});

OurAPP.listen(4000, ()=> console.log("Server is running"));
