/**
 * AuthService
 */
'use strict';

var co = require('co'),
 	  request = require("co-request"),
    bcrypt = require('bcrypt-as-promised');

var AuthService = {

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
