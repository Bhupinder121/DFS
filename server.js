const express = require('express');
const app = express();
const PORT = 300;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    console.log("new connection");
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, ()=>{
    console.log("listening at port ", PORT)
})