import AppDispatcher from '../flux_dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import Auth from '../utils/auth';

var CHANGE_EVENT = 'change';

var booklists = [];

function retrieveBooklists(){
  let options = {};
  options.jwt = localStorage.token;
  Auth.request(Auth.url + '/book', processData, 'GET', options);
}

function processData(response){
  let obj = JSON.parse(response.target.responseText);
  console.log('obj ',obj);
  booklists = obj.data.booklist;
  emitChange();
}

function emitChange() {
  BooklistStore.emit(CHANGE_EVENT);
}

var BooklistStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getBooklists: function(){
    return booklists;
  }
});

function handleAction(action){
  switch (action.type) {
    case 'retrieve_booklists':
      retrieveBooklists();
      break;
    default:
      console.log('Something wrong...');
  }
}

BooklistStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = BooklistStore;
