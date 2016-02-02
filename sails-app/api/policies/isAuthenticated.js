// policies/isAuthenticated.js

'use strict';

var jwt = require('jsonwebtoken');

module.exports = function isAuthenticated(req, res, next){
  let token = req.headers['jwt'];
  if(token){
    jwt.verify(token, process.env.secret, function(err, decoded){
      if(err){
        console.log('auth err ', err);
        return res.badRequest({status:'error',statusMessage:'Failed to authenticate token.'});
      }else{
        req.user = decoded;
        next();
      }
    });
  }else {
    return res.badRequest({status:'error',statusMessage:'Failed to authenticate token.'});
  }
};
