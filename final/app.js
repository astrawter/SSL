var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const session = require("express-session");
app.use(session({secret:"secret", saveUninitialized:true,resave:true}))
var sess;

console.log(sess);
let ejs = require("ejs");
const router = express.Router();

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

router.get("/", function(req, res) {
  sess = req.session;
  res.render("index", {
    pagename: "Home",errors:null,sess:sess
  })
})

router.get("/profile", function(req,res){
  sess = req.session;
  console.log("sess "+ sess);
  if (typeof(sess)=="undefined" || sess.loggedin != true) {
    var errors = ["Not an authenticated user"];
    res.render("index",{pagename:"Home",errors:errors})
  }else {
    res.render("profile",{pagename:"Profile",sess:sess})
  }
})

router.get("/logout", function(req,res){
  sess = req.session;
  sess.destroy(function(err){
    res.redirect("/");
  })
})

router.post("/login", function(req, res) {
  //displays form information to the console
  console.log(req.body);

  //Validate user information
  //keeps track of all errors from form validation
  var errors=[];
  var counter= 0;

  //Validate Email Address
  if (req.body.email !== "Mike@aol.com") {
    errors.push("Please enter a valid email address")
  }else {
    counter +=1;
  }

  //Validate Password
  if (req.body.password !== "abc123") {
    errors.push("Please enter the correct password")
  }else {
    counter +=1;
  }

  //validate user
  if (counter == 2) {
    console.log("Test");
    sess = req.session;
    sess.loggedin = true;
    //redirects to profile
    res.render("profile",{pagename:"Profile",sess:sess})
  }else {
    //redirect to index with errors
    res.render("index", {pagename: "Home", errors:errors});
  }
})


app.use(express.static("public"));
app.use("/", router);
var server = app.listen("8080");
