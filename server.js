const express = require('express');
const app = express();
const ejs = require("ejs");
const routes = require('./routes.js');
const PORT = 300;
app.set('view-engine', 'ejs');
app.use("/", routes)

app.use(express.static(__dirname + "/public"));



// app.get('/', (req, res)=>{
//     console.log("new connection");
//     res.render(__dirname + "/public/index.ejs");
// });

app.listen(PORT, ()=>{
    console.log("listening at port ", PORT)
})