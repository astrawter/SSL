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


router.post("/login", function(req, res) {
  //displays form information to the console
  console.log(req.body);

  //Validate user information
  //keeps track of all errors from form validation
  var errors=[];

  //Validate Email Address
  if (req.body.email !== "Mike@aol.com") {
    errors.push("Please enter a valid email address")
  }

  //Validate Password
  if (req.body.password !== "abc123") {
    errors.push("Please enter a valid zip code")
  }

  //redirect to index
  console.log(errors.length);
  res.render("index", {pagename: "Home", errors:errors});
})


app.use(express.static("public"));
app.use("/", router);
var server = app.listen("8080");
