var express = require('express');
var app = express();

var convertor = require('convertor');

app.get('/usfx_to_json/usx', function(req, res){

  var http = require("http");

  var options = {
      host: 'www.operationagape.com' ,
      path: '/soveetest/Bible_edited.xml'
  };

  http.get(options, function (http_res) {
      // initialize the container for our data
      var data = "";

      // this event fires many times, each time collecting another piece of the response
      http_res.on("data", function (chunk) {
          // append this chunk to our growing `data` var
          data += chunk;
      });

      // this event fires *one* time, after all the `data` events/chunks have been gathered
      http_res.on("end", function () {
          // you can use res.send instead of console.log to output via express
          res.send(data);
          console.log(data);
          console.log('###########end########');
      });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
