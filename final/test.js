var AWS = require("aws-sdk");
var dynamoDb = new AWS.DynamoDB();

exports.handler = function(event, context, callback) {

     async function f(event) {
     return await new Promise((resolve, reject) => {

     var params = {
        TableName:"myssltable",
        FilterExpression: '#email = :email and #password=:password',
        ExpressionAttributeNames: {
            '#email': 'email',
            '#password': 'password',
        },
        ExpressionAttributeValues: {
        ':email': {'S': 'john@aol.com'},
        ':password': {'S': 'pass1234'}
            //':email': {'S': event.queryStringParameters.email},

            //':password': {'S': event.queryStringParameters.password}
        }
     }

     dynamoDb.scan(params, (error, data) => {
         if (error) {
          console.log(error.stack);
         }else{
          console.log(JSON.stringify(data));
          callback(null,{
            statusCode:200,
            body:JSON.stringify(data),
            headers:{"Content-type":"application:json"}
            })
         }
        })
    })
}
f(event)
//aws Gateway myawsurl.lambda?email=mike@aol.com&password=1234
}




// var AWS = require("aws-sdk");
// var dynamoDb = new AWS.DynamoDB();

// exports.handler = function(event, context, callback) {

//     async function f(event) {
//         return await new Promise((resolve, reject) => {

//             var params = {
//                 TableName: "myssltable",
//                 FilterExpression: '#email = :email and #password=:password',
//                 ExpressionAttributeNames: {
//                     '#email': 'email',
//                     '#password': 'password',
//                 },
//                 ExpressionAttributeValues: {
//                     ':email': { 'S': event.queryStringParameters.email },
//                     ':password': { 'S': event.queryStringParameters.password }
//                 }
//             }

//             dynamoDb.scan(params, (error, data) => {
//                 if (error) {
//                     console.log("There was an error");
//                     console.log("ERROR: " + error.stack);
//                 }
//                 else {
//                     console.log("Data: " + JSON.stringify(data));
//                     callback(null, {
//                         statusCode: 200,
//                         body: JSON.stringify(data),
//                         headers: { "Content-type": "application:json" }
//                     })
//                 }
//             })
//         })
//     }
//     f(event)

//     //aws Gateway myawsurl.lambda?email=mike@aol.com&password=1234
// }

"use strict"
var express = require("express");
var request = require("request");
var AWS = require("aws-sdk");
var dynamoDb = new AWS.DynamoDB();

//MISSING LIBRARY CHECK YOUR ERRORS ON THE CONSOLE
var app = express();
var router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/form", function(req, res) {
  var html = '<div><form action="/awsdata" method="POST"><label for="email">Email:</label><input type="text" name="email" placeholder="Enter Email"><br><label for="password">Password:</label><input type="password" name="password" placeholder="Enter Password"><br><input type="submit"></form></div>';
    res.send(html);
})

router.post("/awsdata", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var reqURL = "https://jchfloh14m.execute-api.us-east-2.amazonaws.com/prod?email=" + email + "&password=" + password;

    request(reqURL, { json: true }, (err, response, body) => {
        if (err) { return console.log(err) };
        if (body.Count > 0) {
            //DISPLAY VALID RESPONSE
        }
        else {
            //DISPLAY ERROR RESPONSE
        }
    })
})
app.use("/", router);
app.listen("8080");
