let express = require("express");
let todos = require('./data/dolist.json');
let app = express();
let path = require('path');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});




app.get("/todos", (req, res, next) => {
    res.json(todos);
});

// app.get("/:id", (req, res, next) => {
//     res.sendFile(path.join(__dirname + '/dist/' + req.params.id));
// });

app.get("/:id", (req, res, next) => {
         res.sendFile(path.join(__dirname + '/dist/' + req.params.id));
     });

 app.get("/css/Main.css", (req, res, next) => {
        res.sendFile(path.join(__dirname + '/src/css/Main.css'));
});