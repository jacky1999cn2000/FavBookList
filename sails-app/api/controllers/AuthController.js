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
      // let userId = req.param('userName');
      // let password = req.param('password');
      // let msg = '';
      // //
      // // if(!userId || !password){
      // //   return res.badRequest('Please provide userName and password.');
      // // }
      //
      // //let result = yield AuthService.hashPassword('hahaha');
      // let result = yield AuthService.comparePassword('hahaha','$2a$10$HmLTn8Bg//cArEsdFRKHGOLZSp2lZzt4eeTtDB5A5tcrwsbNobGQO');
      // //let result = yield AuthService.comparePassword('hahaha','xxx');
      // console.log('result_ ;;;  ', result);
      // return result;
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
      // mismatch password will caused this err:
      //{ [MismatchError: invalid] message: 'invalid', name: 'MismatchError' }
      // if(err.name == 'MismatchError'){
      //   res.ok('haha');
      // }
      // res.badRequest();
    });
  },
}
