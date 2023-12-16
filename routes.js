const express = require('express');
const Router = express.Router();

Router.use(express.static(__dirname + "/public"));



Router.get('/', (req, res)=>{
    console.log("new connection");
    res.render(__dirname + "/public/index.ejs");
});


Router.get("/home", (req, res)=>{
    res.render(__dirname+"/public/home.ejs")
});

Router.post("/upload", (req, res)=>{

});

module.exports = Router;