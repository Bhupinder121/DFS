const express = require('express');
const Router = express.Router();
const multer  = require('multer')
const upload = multer()
Router.use(express.static(__dirname + "/public"));



Router.get('/', (req, res)=>{
    console.log("new connection");
    res.render(__dirname + "/public/main.ejs");
});


Router.get("/home", (req, res)=>{
    res.render(__dirname+"/public/home.ejs")
});

Router.post("/upload", upload.single('file'), (req, res)=>{
    res.send(req.file);
});

module.exports = Router;