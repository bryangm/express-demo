var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

bookRouter = require('./routes/bookRoutes')(book);

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req,res) {
  res.send('welcome to my API');
});

app.listen(port, function() {
  console.log('gulp is running on port: ' + port);
});
