/**
 * BookController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var co = require('co');

module.exports = {

    /*
    * get all books for specified booklist
    */
    getBooksFromBookList: function(req, res){
      co(function* (){
        let id = req.param('id');

        let booklist = yield BookList.findOne({id:id}).populate('books');

        let result = {};
        result.status = 'ok';
        result.data = booklist;
        return result;
      })
      .then(function(result){
        res.ok(result);
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });
    },

    /*
    * add book to specified booklist
    */
    addBookToBookList: function(req, res){
      co(function* (){
        let bk = req.param('book');
        let bklt = req.param('booklist');

        let booklist = yield BookList.findOne({id:bklt.id});

        let book = yield Book.findOne({isbn13:bk.isbn13});
        if(!book){
          console.log('book didn\'t exist in db, so create it.');
          book = yield Book.create(bk);
        }

        booklist.books.add(book.id);
        booklist.save();

        let result = {};
        result.status = 'ok';
        result.data = book;
        return result;
      })
      .then(function(result){
        res.ok(result);
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });
    },

    /*
    * remove a book from specified booklist
    */
    removeBookFromBookList: function(req, res){
      co(function* (){
        let bk = req.param('book');
        let bklt = req.param('booklist');

        let booklist = yield BookList.findOne({id:bklt.id});

        booklist.books.remove(bk.id);
        booklist.save();

        let result = {};
        result.status = 'ok';
        return result;
      })
      .then(function(result){
        res.ok(result);
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });
    },

    /*
    * get user & user's booklist based on jwt's user info
    */
    getUserBookList: function(req, res){
      co(function* (){
        //since we already authenticated jwt, so the user exists for sure;
        //however, booklist will possibly be empty array.
        let record = yield User.findOne({username:req.user.username}).populate('booklist');
        delete record.password;

        let result = {};
        result.status = 'ok';
        result.data = record;
        return result;
      })
      .then(function(result){
        res.ok(result);
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });
    },

    /*
    * create a booklist for the user encrypted in jwt
    */
    createUserBookList: function(req, res){
      co(function* (){
        let result = {};

        /* name duplication should be dealt with in front-end
        */
        // let record = yield BookList.findOne({name:req.param('name')});
        // if(record){
        //   result.status = 'error';
        //   result.statusMessage = 'A booklist with same name already exists.';
        //   return result;
        // }

        let createdBookList = yield BookList.create({name:req.param('name'),owner:req.user.id});
        result.status = 'ok';
        result.data = createdBookList;
        return result;
      })
      .then(function(result){
        if(result.status == 'ok'){
          res.ok(result);
        }else{
          res.badRequest(result);
        }
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });

    },

    /*
    * delete a booklist for the user encrypted in jwt
    */
    deleteUserBookList: function(req, res){
      co(function* (){

        let deletedBookList = yield BookList.destroy({id:req.param('booklist').id});

        let result = {};
        result.status = 'ok';
        result.data = deletedBookList;
        return result;
      })
      .then(function(result){
        if(result.status == 'ok'){
          res.ok(result);
        }else{
          res.badRequest(result);
        }
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });

    },

    /*
    * search books via keyword by douban API
    */
    search: function(req, res){
      co(function* (){
        let result = BookService.search(req.query);
        return result;
      })
      .then(function(result){
        res.send(result);
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });
    },

    /*
    * get readfree book url via ISBN
    */
    readfree: function(req, res){
      co(function* (){
        let result = BookService.readfree(req.query);
        return result;
      })
      .then(function(result){
        res.send(result);
      })
      .catch(function(err) {
        console.log('*** catch ***');
        console.log(err);
        res.badRequest();
      });
    }
};
