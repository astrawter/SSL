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
  dir = filename.dir=="/"?"":filename.dir;
  page = filename.name==""?"index":filename.name;
  console.log("dir: "+dir);
  console.log("filen: "+filen);
  console.log("ext: "+ext);
  f = (dir+filen+ext).replace("/","");
  console.log("f: "+f);
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
// console.log("data: "+data);
      if (page){
        if (mimeTypes.hasOwnProperty(ext)){
          res.writeHead(200, { 'Content-Type': ext});
          res.end(data, 'utf-8');
        }
      }
    })
  }
}).
listen("8080")
