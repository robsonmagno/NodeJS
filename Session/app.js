var express = require('express');
var app = express();
var bodyParser = require('body-parser');
/*
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));*/

var port = 8080;

require('./router')(app);

app.set('view engine', 'ejs');

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
