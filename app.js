var express = require('express');
var app = express();
var url = require('url')
var convertor = require('./convertor.js');
var http = require("http");

// initialize the container for our data
var data = "";

app.get('/json', function(req, res){
    console.log(req.query.usfx);
    usfxUrl = req.query.usfx;
    if (!usfxUrl.startsWith('http://')) {
	usfxUrl = 'http://' + req.query.usfx;
    }
    parsedUrl = url.parse(usfxUrl);
    console.log(parsedUrl.host);
    console.log(parsedUrl.path);

  var options = {
    host:  parsedUrl.host,
    path: parsedUrl.pathname
  }; 

    
  http.get(options, function (http_res) {
    // this event fires many times, each time collecting another piece of the response
    http_res.on("data", function (chunk) {
      // append this chunk to our growing `data` var
      data += chunk;
    });
    // this event fires *one* time, after all the `data` events/chunks have been gathered
    http_res.on("end", function () {
	json_res = convertor.processData(data)
	res.status(200).send(json_res);
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
