//1
var http = require("http");
//2
function myname() {
  console.log("Here is my IP address");
}
//3
async function callHttpbin() {
  let promise = new Promise((resolve, reject) => {
    http.get(
      'http://httpbin.org/ip',
      function(response) {
        var str = "";
        response.setEncoding('utf8');
        response.on('data', function(data) {
          str += data;
        });
        response.on('end', function() {
          var result = JSON.parse(str);
          myips = result.origin;
          resolve(myips)
        });
      }
    );
  });

  let result = await promise;
}

async function executeAsyncTask() {
  const valueA = await callHttpbin()
  const valueB = myname();
  console.log(valueB + " " + valueA)
}

executeAsyncTask()
// Output Here is my IP address 149.24.160.1, 149.24.160.1
