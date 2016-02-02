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

  createUserBookList: function(req, res){
    return co(function* (){
      let user = req.user;
      let booklistName = req.param('name');
      console.log('user- ', user);
      console.log('name- ', booklistName);

      let result = {};

      if(!user || !booklistName){
        result.status = 'error';
        result.errorMessage = 'User or booklistName are not available.';
        return result;
      }

      result = yield BookService.findBookList(booklistName);
      console.log('service findBookList result- ', result);
      //if user with same name already exists, return error
      if(result.status == 'ok'){
        delete result.data;
        result.status = 'error';
        result.errorMessage = 'A booklist with same name already exists.'
        return result;
      }

      result = yield BookService.createBookList({'name':booklistName,'owner':user.id});
      return result;
    });
  },

  /*
  * search book via douban api
  */
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

      let keys = ['images','alt','id','title','author','isbn13'];
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

      let url = 'http://readfree.me/search' + '?' + BookService.serialize(query);;
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
  * create booklist in db (try...catch block was used for sailsjs built-in validation check)
  */
  createBookList:function(booklist){
    return co(function* (){
      let result = {};
      try{
        let createdBookList = yield BookList.create(booklist);
        result.status = 'ok';
        result.data = createdBookList;
        return result;
      }catch(err){
        result.status = 'error';
        result.errorMessage = err;
        return result;
      }
    });
  },

  /*
  * find booklist in db
  */
  findBookList:function(name){
    return co(function* (){
      let result = {};
      let record = yield BookList.findOne({name:name});
      if(typeof record === 'undefined'){
        result.status = 'error';
        result.statusMessage = 'Can\'t find booklist in database.';
        return result;
      }
      result.status = 'ok';
      result.data = record;
      return result;
    });
  },

  /*
  * filter out unnecessary keys from an object
  */
  filterOutUnnecessaryKeys: function(obj) {
		let keys = ['images','alt','id','title','author','isbn10','isbn13'];
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
