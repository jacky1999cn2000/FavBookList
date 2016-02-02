/**
 * AuthService
 */
'use strict';

var co = require('co'),
 	  request = require("co-request"),
    bcrypt = require('bcrypt-as-promised'),
    jwt = require('jsonwebtoken');

var AuthService = {

  /*
  * register a user
  */
  register:function(req, res){
    return co(function* (){

      let userName = req.param('userName');
      let password = req.param('password');
      let result = {};

      if(!userName || !password){
        result.status = 'error';
        result.errorMessage = 'Please provide userName and password.';
        return result;
      }

      result = yield AuthService.findUser(userName);

      //if user with same name already exists, return error
      if(result.status == 'ok'){
        delete result.data;
        result.status = 'error';
        result.errorMessage = 'User already exists.'
        return result;
      }

      let hashPassword = yield AuthService.hashPassword(password);
      result = yield AuthService.createUser({'userName':userName,'password':hashPassword});
      return result;
    });
  },

  /*
  * login
  */
  login:function(req, res){
    return co(function* (){

      let userName = req.param('userName');
      let password = req.param('password');
      let result = {};

      if(!userName || !password){
        result.status = 'error';
        result.errorMessage = 'Please provide userName and password.';
        return result;
      }

      result = yield AuthService.findUser(userName);

      //if not found, return error
      if(result.status == 'error') return result;

      //if password doesn't match, return error
      try{
        yield AuthService.comparePassword(password,result.data.password);
      }catch(err){
        // mismatch password will caused this err:
        //{ [MismatchError: invalid] message: 'invalid', name: 'MismatchError' }
        delete result.data;
        result.errorMessage = 'Password doesn\'t match database record.';
        return result;
      }

      //authentication success, so create token and return
      let token = jwt.sign(result.data,process.env.secret,{expiresIn: 3600});
      delete result.data;
      result.token = token;
      return result;
    });
  },

  /*
  * create user in db (try...catch block was used for sailsjs built-in validation check)
  */
  createUser:function(user){
    return co(function* (){
      let result = {};
      try{
        let createdUser = yield User.create(user);
        delete createdUser.password;
        result.status = 'ok';
        result.data = createdUser;
        return result;
      }catch(err){
        result.status = 'error';
        result.errorMessage = err;
        return result;
      }
    });
  },

  /*
  * find user in db
  */
  findUser:function(userName){
    return co(function* (){
      let result = {};
      let record = yield User.findOne({userName:userName});
      if(typeof record === 'undefined'){
        result.status = 'error';
        result.statusMessage = 'Can\'t find user in database.';
        return result;
      }
      result.status = 'ok';
      result.data = record;
      return result;
    });
  },

  /*
  * hash password
  */
  hashPassword:function(password){
    return co(function* (){
      let hashedPassword = yield bcrypt.hash(password, 10);
      return hashedPassword;
    });
  },

  /*
  * compare password
  */
  comparePassword:function(password, hashedPassword){
    return co(function* (){
      let result = yield bcrypt.compare(password, hashedPassword);
      return result;
    });
  }

}

module.exports = AuthService;
