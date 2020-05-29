var http = require("http");

function myname() {
  console.log("Here is my IP address");
}

async function callHttpbin() {
  let result ="";
  let promise = await new Promise((resolve, reject) => {
    http.get(
      'http://httpbin.org/ip',
      function(response) {
        var str = "";
        response.setEncoding('utf8');
        response.on('data', function(data) {
          str += data;
        });
        response.on('end', function() {
          var myips = JSON.parse(str);
          result = myips.origin;
          resolve(result)
        });
      }
    );
  });
  return result;
}

async function executeAsyncTask() {
  const valueA = await callHttpbin();
  const valueB = myname();
  console.log(valueA)
}

executeAsyncTask()
