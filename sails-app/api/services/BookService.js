/**
 * ChallengeService
 */
'use strict';

var co = require('co'),
 	  request = require("co-request");

var BookService = {

  search: function(query) {
    return co(function* (){

      let url = 'https://api.douban.com/v2/book/search' + '?' + BookService.serialize(query);
      let resObj = yield BookService.makeRequest(url);

      let result = {};
      result.hasNext = (resObj.total - (resObj.count + resObj.start)) > 0;
      result.hasPrev = (resObj.start != 0);

      if(result.hasNext){
        result.nextStart = resObj.start + resObj.count;
      }

      if(result.hasPrev){
        result.prevStart = resObj.start - 20;
      }

      let keys = ['images','alt','id','title','author','isbn10','isbn13'];
      result.books = [];

      if(resObj.books && resObj.books.length > 0){
        resObj.books.map((book)=>{
          result.books.push(BookService.filterOutUnnecessaryKeys(book));
        });
      }
      return result;
    });
  },

  filterOutUnnecessaryKeys: function(obj) {
		let keys = ['images','alt','id','title','author','isbn10','isbn13'];
		let result = {};
		keys.forEach((key) => {
			if(obj[key]) result[key] = obj[key];
		})
		return result;
	},

  serialize: function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },

  /*
  * Make Request and Parse Response
  */
  makeRequest: function(url){
    return co(function* (){
      let response = yield request(url);
      let resObj = JSON.parse(response.body);
      return resObj;
    });
  }

}

module.exports = BookService;
