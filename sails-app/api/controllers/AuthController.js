/**
 * AuthController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

'use strict';

var co = require('co'),
    jwt = require('jsonwebtoken');

module.exports = {

  register: function(req, res){
    co(function* (){

      let username = req.param('username');
      let password = req.param('password');
      let result = {};

      if(!username || !password){
        result.status = 'error';
        result.errorMessage = 'Please provide username and password.';
        return result;
      }

      let record = yield User.findOne({username:username});

      //if user with same name already exists, return error
      if(record){
        result.status = 'error';
        result.errorMessage = 'User already exists.'
        return result;
      }

      let hashPassword = yield AuthService.hashPassword(password);
      let createdUser = yield User.create({'username':username,'password':hashPassword});
      delete createdUser.password;

      result.status = 'ok';
      result.data = createdUser;

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

      let username = req.param('username');
      let password = req.param('password');
      let result = {};

      if(!username || !password){
        result.status = 'error';
        result.errorMessage = 'Please provide username and password.';
        return result;
      }

      let record = yield User.findOne({username:username});

      //if not found, return error
      if(!record){
        result.status = 'error';
        result.errorMessage = 'User not found.'
        return result;
      }

      //if password doesn't match, return error
      try{
        yield AuthService.comparePassword(password,record.password);
      }catch(err){
        // mismatch password will caused this err:
        //{ [MismatchError: invalid] message: 'invalid', name: 'MismatchError' }
        result.status = 'error';
        result.errorMessage = 'Password doesn\'t match database record.';
        return result;
      }

      //authentication success, so create token and return
      let token = jwt.sign(record,sails.config.appconfig.secret,{expiresIn: 3600});
      result.status = 'ok';
      result.token = token;
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
