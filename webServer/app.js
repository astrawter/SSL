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
          res.end(data, 'utf-8');
        }
      }
    })
  }
}).
listen("8080")
