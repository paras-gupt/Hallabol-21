const express  = require("express");
const ejs = require('ejs');
const bodyParser = require("body-parser");

const app = express(); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('views', './public/views');
app.set ("view engine", "ejs");
app.use(express.json());

app.get("/", async (req,res) => {
    res.render("index");
});

app.get("/team", async (req,res) => {
    res.render("team");
});

app.get("/games", async (req,res) => {
    res.render("games");
});

app.listen(process.env.PORT || 3000, function (){
    console.log("Server running");
});