var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
//VALIDATE
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

let ejs = require("ejs");
const router = express.Router();

http.createServer(function(req,res){
  //stop the call for favicon
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  //get data from url
  var parsed = url.parse(req.url);
  var filename = path.parse(parsed.pathname);

  //variables
  filen = filename.name==""?"index":filename.name;
  ext = filename.ext==""?".html":filename.ext;
  dir = filename.dir=="/"?"":filename.dir+"/";
  page = filename.name==""?"index":filename.name;

  //file path
  f = (dir+filen+ext).replace("/","");

  var mimeTypes = {
    '.html':"text/html",
    '.js':"text/javascript",
    '.css':"text/css",
    '.png':"image/png",
    '.jpg':"image/jpg",
    '.gif':"image/gif",
  };

  if (f) {
    fs.readFile(f,function(err,data){

      if (page){
        if (mimeTypes.hasOwnProperty(ext)){
          //give content type based off object
          res.writeHead(200, { 'Content-Type': mimeTypes[ext]});
          res.end(data, 'utf-8');
        }
      }
    })
  }
})
//end
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

router.get("/", function(req, res) {
  res.render("index", {
    pagename: "Home",errors:null
  })
})

router.get("/about", function(req, res) {
  res.render("about", {
    pagename: "About"
  })
})


router.post("/register", function(req, res) {
  //displays form information to the console
  console.log(req.body);

  //Validate user information
  //keeps track of all errors from form validation
  var errors=[];

  //Validate name
  if (req.body.fname == "") {
    errors.push("Please enter your first name")
  }
  if (req.body.lname == "") {
    errors.push("Please enter your last name")
  }

  //Validate Address
  if (!/^\d+\s[A-z]+\s[A-z]+/.test(req.body.addy)) {
    errors.push("Please enter a valid address")
  }

  //Validate City
  if (req.body.fname == "") {
    errors.push("Please enter your name")
  }

  //Validate State
  if (!/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/.test(req.body.state)) {
    errors.push("Please enter a valid state")
  }

  //Validate Zip
  if (!/^\d{5}$/.test(req.body.zip)) {
    errors.push("Please enter a valid zip code")
  }

  //Validate Age
  if (!/^(1[89]|[2-9]\d)$/.test(req.body.age)) {
    errors.push("You must be 18 years or older to register")
  }

  //Validate Gender
  if (req.body.gender == null) {
    errors.push("Please choose a gender")
  }

  //Validate Consent
  if (req.body.consent !== "true") {
    errors.push("Please agree to the terms and conditions")
  }

  //Validate bio
  if (req.body.bio == "") {
    errors.push("Please enter some information about you")
  }



  //redirect to index
  console.log(errors.length);
  res.render("index", {pagename: "Home", errors:errors});
})


app.use(express.static("public"));
app.use("/", router);
var server = app.listen("8080");
