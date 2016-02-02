/**
 * BookController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var co = require('co');

module.exports = {

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

    createUserBookList: function(req, res){
      co(function* (){
        let result = {};

        let record = yield BookList.findOne({name:req.param('name')});
        if(record){
          result.status = 'error';
          result.statusMessage = 'A booklist with same name already exists.';
          return result;
        }

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
