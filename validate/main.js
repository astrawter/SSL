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

let ejs = require("ejs");
const router = express.Router();

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

router.get("/", function(req, res) {
  res.render("index", {
    pagename: "Home"
  })
})

router.get("/about", function(req, res) {
  res.render("about", {
    pagename: "About"
  })
})

router.get("/success", function(req, res) {
  res.render("success", {
    pagename: "Success"
  })
})

router.post("/login", function(req, res) {
  //displays form information to the console
  console.log(req.body);

  //Validate user information

  //keeps track of all errors from form validation
  var errors=[];

  //Validate name
  if (req.body.fname == "") {
    errors.push("Please enter your name")
  }

  //Validate Address
  if (!/^\d+\s[A-z]+\s[A-z]+/.test(req.body.addy)) {
    errors.push("Please enter a valid address")
  }

  //Validate City

  //redirect to success page
  console.log(errors);
  res.render("success", {pagename: "Success", errors:errors});
})

app.use(express.static("public"));
app.use("/", router);
var server = app.listen("8080");
