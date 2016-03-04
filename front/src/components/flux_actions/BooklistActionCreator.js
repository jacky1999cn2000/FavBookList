import AppDispatcher from '../flux_dispatcher/AppDispatcher';

module.exports = {

  retrieveBooklists: function(){
    let action = {
      type: 'retrieve_booklists'
    };
    AppDispatcher.dispatch(action);
  },
}
