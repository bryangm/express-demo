var express = require('express');

var routes = function(book) {
  var bookRouter = express.Router();

  bookRouter.route('/')
    .post(function(req,res) {
      var createBook = new book(req.body);

      createBook.save();
      res.status(201).send(createBook);
    })
    .get(function(req,res) {
      var query = {};
      if(req.query.genre) {
        query.genre = req.query.genre;
      }
      book.find(query, function(err,books) {
        if(err) {
          res.status(500).send(err);
        }
        else {
          res.json(books);
        }
      });
    });

  bookRouter.route('/:bookId')
    .get(function(req,res) {

      book.findById(req.params.bookId, function(err,book) {
        if(err) {
          res.status(500).send(err);
        }
        else {
          res.json(book);
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
