/**
 * BookController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var co = require('co');

module.exports = {

    search: function(req, res){
      co(function* (){
        let result = BookService.search(req.query);
        console.log('result in controller: ' , result);
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
