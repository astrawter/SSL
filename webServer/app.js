var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");


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
          let currentNav = '';
          if(page == "index"){
            currentNav = '<li class="nav-item active px-lg-4"><a id="current" class="nav-link text-uppercase text-expanded" href="/">Home<span class="sr-only">(current)</span></a></li><li class="nav-item px-lg-4"><a class="nav-link text-uppercase text-expanded" href="/about">About</a></li><li class="nav-item px-lg-4"><a class="nav-link text-uppercase text-expanded" href="/store">Store</a></li>'
          }else if(page == "about"){
            currentNav ='<li class="nav-item active px-lg-4"><a class="nav-link text-uppercase text-expanded" href="/">Home</a></li><li class="nav-item active px-lg-4"><a id="current" class="nav-link text-uppercase text-expanded" href="/about">About</a></li><li class="nav-item px-lg-4"><a class="nav-link text-uppercase text-expanded" href="/store">Store</a></li>'
          }else if (page == "store"){
            currentNav = '<li class="nav-item active px-lg-4"><a class="nav-link text-uppercase text-expanded" href="/">Home</a></li> <li class="nav-item px-lg-4"><a class="nav-link text-uppercase text-expanded" href="/about">About</a></li><li class="nav-item active px-lg-4"><a id="current" class="nav-link text-uppercase text-expanded" href="/store">Store</a></li>'
          }
          let nav = '<nav class="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav"><div class="container"><a class="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="#">Start Bootstrap</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarResponsive"><ul class="navbar-nav mx-auto"'+currentNav+'</ul></div></div></nav>';
          res.write('<script>document.getElementById("current").style.color="Orange";</script>')
          res.write('<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><title>Web Server</title><!-- Bootstrap core CSS --><link href="css/bootstrap.min.css" rel="stylesheet"><!-- Custom fonts for this template --><link href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i" rel="stylesheet"><!-- Custom styles for this template --><link href="css/business-casual.min.css" rel="stylesheet"></head>')
          res.write(nav)
          res.end(data, 'utf-8');
        }
      }
    })
  }
}).
listen("8080")
