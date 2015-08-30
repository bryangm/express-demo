var express = require('express');

var routes = function(book) {
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  bookRouter.use('/:bookId', function(req,res,next) {
    book.findById(req.params.bookId, function(err,book) {
      if(err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .delete(function(req,res) {
      req.book.remove(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('removed');
        }
      });
    })
    .put(function(req,res) {
      req.book.title=req.body.title;
      req.book.author=req.body.author;
      req.book.genre=req.body.genre;
      req.book.read=req.read.title;
      req.book.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .patch(function(req,res) {
      if(req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.book[p] = req.body[p];
      }
      req.book.save(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    })
    .get(function(req,res) {
      var returnBook = req.book.toJSON();
      returnBook.links = {};
      var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
      returnBook.links.filterByThisGenre = newLink.replace(' ', '%20');
      res.json(returnBook);
    });
  return bookRouter;
};

module.exports = routes;
