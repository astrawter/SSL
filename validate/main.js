var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let ejs = require("ejs");
const router = express.Router();

app.set("view engine","ejs");
app.engine("ejs",require("ejs").__express);

router.get("/",function(req,res){
  res.render("index",{pagename:"Home"})
})

router.get("/about", function(req,res){
  res.render("about",{pagename:"About"})
})

router.get("/success", function(req,res){
  res.render("success",{pagename:"Success"})
})

router.post("/login",function(req,res){
  console.log(req.body);
  res.redirect("/success")
})
app.use(express.static("public"));
app.use("/",router);
var server = app.listen("8080");
