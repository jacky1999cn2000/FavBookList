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

    },

    createUserBookList: function(req, res){

      co(function* (){
        let result = BookService.createUserBookList(req, res);
        console.log('controller result - ',result);
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
