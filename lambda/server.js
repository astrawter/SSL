var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Session info
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

router.get("/profile", function(req,res){
  sess = req.session;
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

//Validate login
router.post("/login", function(req, res) {
  //keeps track of all errors from form validation
  var errors=[];
  var email = req.body.email;
  var password = req.body.password;
  var epURL = "https://6j2kca7f2m.execute-api.us-east-2.amazonaws.com/prod?email=" + email;

      request(epURL, {
          json: true
      }, (err, response, body) => {
          if (err) {
              return console.log(err)
          };
          if (body.Count > 0) {
            if (password === body.Items.password) {
              sess = req.session;
              sess.loggedin = true;
              res.render("profile",{pagename:"Profile",sess:sess})
            }else {
              errors.push("Incorrect password")
              res.render("index", {pagename: "Home", errors:errors})
            }
          } else {
            errors.push("Email not found")
            res.render("index", {pagename: "Home", errors:errors})
          }
      })
  })

app.use("/", router);
app.listen("8080");
