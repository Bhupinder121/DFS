const app = require('express')();

const PORT = 300;

app.get('/', (req, res)=>{
    console.log("new connection");
    res.sendFile("D:/Projects/website/DFS/frontend/index.html");
});

app.listen(PORT, ()=>{
    console.log("listening at port ", PORT)
})