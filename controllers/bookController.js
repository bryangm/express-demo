var bookController = function(book) {
  var post = function(req,res) {
    var createBook = new book(req.body);

    if(!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      createBook.save();
      res.status(201);
      res.send(createBook);
    }
  }

  var get = function(req,res) {
    var query = {};
    if(req.query.genre) {
      query.genre = req.query.genre;
    }
    book.find(query, function(err,books) {
      if(err) {
        res.status(500).send(err);
      }
      else {
        var returnBooks = [];
        books.forEach(function(element, index, array) {
          var newBook = element.toJSON();
          newBook.links = {};
          newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
          returnBooks.push(newBook);
        });
        res.json(returnBooks);
      }
    });
  }

  return {
    post: post,
    get: get
  }
}

module.exports = bookController;
