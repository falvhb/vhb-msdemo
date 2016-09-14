// init project
var express = require('express');
var request = require('request');
var parseString = require('xml2js').parseString;
var app = express();



app.use(express.static('public'));



app.get("/", function (req, res) {
  var URI = 'http://www.handelsblatt.com/contentexport/feed/eilmeldung';
  request(URI, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
        var json = {
          status: -1,
          description: 'Initializing'
        };
        delete result.rss.$;

        if (result.rss.channel.length && result.rss.channel[0].item && result.rss.channel[0].item.length){
          json.status= 0;
          json.description = 'Data fetched successfully';
          json.data = result.rss.channel[0].item;
        }
        
        res.send(JSON.stringify(json, undefined, 4));
      });
    } else {
      res.send({status: -1, error: 'Feed not fetchable'});    
    }
  });
});


































// http://expressjs.com/en/starter/basic-routing.html
app.get("/index", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
  ];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});