/**
 * BookService
 */
'use strict';

var co = require('co'),
 	  request = require("co-request"),
    cheerio = require('cheerio');

var BookService = {

  /*
  * SERVICE METHODS
  */

  /*
  * search book via douban api
  */
  search: function(query) {
    return co(function* (){

      let url = sails.config.appconfig.douban + '?' + BookService.serialize(query);
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
      
      result.books = [];

      if(resObj.books && resObj.books.length > 0){
        resObj.books.map((book)=>{
          result.books.push(BookService.filterOutUnnecessaryKeys(book));
        });
      }
      return result;
    });
  },

  /*
  * scrap readfree.me to get book link for download
  */
  readfree: function(query) {
    return co(function* (){

      let url = sails.config.appconfig.readfree + '?' + BookService.serialize(query);;
      let response = yield BookService.makeRequest(url);
      let result = {};

      if(response.statusCode == 200){
        let $ = cheerio.load(response.body);
        let item = $('#container > ul > li > div > div:nth-child(1) > div:nth-child(2)');
        let url = item.children('a').attr('href');

        if(typeof url === 'undefined'){
          result.status = 'notFound';
        }else{
          result.status = 'http://readfree.me' + url;
        }
      }else{
        result.status = 'notFound';
      }

      return result;
    });
  },


  /*
  * UTILITY METHODS
  */

  /*
  * filter out unnecessary keys from an object
  */
  filterOutUnnecessaryKeys: function(obj) {
		let keys = ['images','alt','title','author','isbn13'];
		let result = {};
		keys.forEach((key) => {
			if(obj[key]) result[key] = obj[key];
		})
		return result;
	},

  /*
  * serialize query parameters
  */
  serialize: function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },

  /*
  * make request and parse response
  */
  makeRequest: function(url){
    return co(function* (){
      let response = yield request(url);
      try{
        let resObj = JSON.parse(response.body);
        return resObj;
      }catch(err){
        return response;
      }
    });
  }

}

module.exports = BookService;
