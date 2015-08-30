var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var book = require('../models/bookModel');
var agent = request.agent(app);

describe('Book Crud Test', function() {
  it('should allow a book to be posted and return a read and _id', function(done) {
    var bookPost = {title: 'new book', author: 'Bryan', genre: 'Fiction'};

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end(function(err, results) {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(function(done) {
    book.remove().exec();
    done();
  });
});
