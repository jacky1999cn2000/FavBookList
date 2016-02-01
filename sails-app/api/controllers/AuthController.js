/**
 * AuthController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var co = require('co');

module.exports = {

  register: function(req, res){
    co(function* (){
      let result = yield AuthService.register(req, res);
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
      console.log('err: ' + err);
      res.badRequest(err);
    });
  },

  login:function(req, res){
    co(function* (){
      let result = yield AuthService.login(req, res);
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
      console.log('err: ' + err);
      res.badRequest(err);
    });
  },
}
