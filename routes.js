const express = require('express');
const Router = express.Router();
const multer  = require('multer')

const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });
Router.use(express.static(__dirname + "/public"));



Router.get('/', (req, res)=>{
    console.log("new connection");
    res.render(__dirname + "/public/main.ejs");
});


Router.get("/home", (req, res)=>{
    res.render(__dirname+"/public/home.ejs")
});

Router.post('/upload', upload.single('file'), (req, res) => {
    const fileBuffer = req.file.buffer;
    const textData = fileBuffer.toString('utf-8');
    console.log('Text data:', textData);

    res.json({'message': "recevied data from client"});
  });

module.exports = Router;