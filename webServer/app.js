var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");


http.createServer(function(req,res){

  //get data from url
  var parsed = url.parse(req.url);
  var filename = path.parse(parsed.pathname);
  console.log(filename);
  filen = filename.name==""?"index":filename.name;

  //find the pages

  fs.readFile(filen+".html",function(err,data){


    res.writeHead(200);
    res.end(data);
  })
}).
listen("8080")
