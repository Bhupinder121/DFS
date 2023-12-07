const express = require('express');
const app = express();
const PORT = 300;

app.use(express.static("D:/Projects/website/DFS/frontend"))

app.get('/', (req, res)=>{
    console.log("new connection");
    res.sendFile("D:/Projects/website/DFS/frontend/index.html");
});

app.listen(PORT, ()=>{
    console.log("listening at port ", PORT)
})