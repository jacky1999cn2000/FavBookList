import AppDispatcher from '../flux_dispatcher/AppDispatcher';

module.exports = {

  retrieveBooks: function(booklistid){
    let action = {
      type: 'retrieve_books',
      id: booklistid
    };
    AppDispatcher.dispatch(action);
  },
}
