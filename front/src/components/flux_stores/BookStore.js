import AppDispatcher from '../flux_dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import Auth from '../utils/auth';

var CHANGE_EVENT = 'change';
var FAIL_EVENT = 'fail';

var books = [];

function retrieveBooks(id){
  let options = {};
  options.jwt = localStorage.bookclubtoken;
  Auth.request(Auth.url + '/book/booklist?id='+id, processData, 'GET', options);
}

function processData(response){
  let obj = JSON.parse(response.target.responseText);
  console.log('obj ',obj);
  if(obj.status == 'ok'){
    books = obj.data.books;
    emitChange();
  }else{
    emitFail();
  }
}

function emitChange() {
  BookStore.emit(CHANGE_EVENT);
}

function emitFail() {
  BookStore.emit(FAIL_EVENT);
}

var BookStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  addFailListener: function(callback){
    this.on(FAIL_EVENT, callback);
  },

  removeFailListener: function(callback){
    this.removeListener(FAIL_EVENT, callback);
  },

  getBooks: function(){
    return books;
  }
});

function handleAction(action){
  switch (action.type) {
    case 'retrieve_books':
      retrieveBooks(action.id);
      break;
    default:
      console.log('This is BookStore, and passed action is not my concern: ',action);
  }
}

BookStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = BookStore;
