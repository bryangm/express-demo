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
      res.json(req.book);
    });
  return bookRouter;
};

module.exports = routes;
