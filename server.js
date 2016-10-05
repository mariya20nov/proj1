var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname)); // eslint-disable-line
app.use(bodyParser.text());

app.listen(8080, function () {
    console.info('We have stared!'); // eslint-disable-line
});
