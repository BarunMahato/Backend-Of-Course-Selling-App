const express = require('express');

const app = express();

app.get("/see", function(req, res){

})

app.post("/signup", function(req, res){

})

app.post("/login", function(req, res){

})

app.post("/purchase", function(req, res){

})


app.listen(3000, function(req, res){
    console.log("Listening on port 3000.");
})