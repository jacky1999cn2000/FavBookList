import React from 'react';
import NavBar from '../navbar/navbar';
import BookBrowser from '../bookbrowser/bookbrowser';
import {browserHistory} from 'react-router';
import BooklistActionCreator from '../flux_actions/BooklistActionCreator';
import BooklistStore from '../flux_stores/BooklistStore';

/*
* BookPanel compoenent will be the controlling view, all states will be managed here
*/
let BookPanel = React.createClass({

  getInitialState: function(){
    return {
      booklists: BooklistStore.getBooklists()
    }
  },

  //register for BooklistStore's events
  componentDidMount: function(){
    BooklistStore.addChangeListener(this.onBooklistsChange);
    BooklistStore.addAuthfailListener(this.onAuthFail);
    BooklistActionCreator.retrieveBooklists();
  },

  //unregister for BooklistStore's events
  componentWillUnmount: function(){
    BooklistStore.removeChangeListener(this.onBooklistsChange);
    BooklistStore.removeAuthfailListener(this.onAuthFail);
  },

  onBooklistsChange: function(){
    console.log('onBooklistsChange');
    console.log('booklists ',BooklistStore.getBooklists());
    this.setState({booklists: BooklistStore.getBooklists()});
  },

  //jwt's expiration is 1 day, in case it expired(typically user should close browser before expiration), just logout
  onAuthFail: function(){
    this.logout();
  },

  logout: function(){
    delete localStorage.token;
    setTimeout((function(){
      browserHistory.push('/login');
    }),1000);
  },

  render: function(){
    console.log('BookPanel render');
    return (
      <div>
        <NavBar booklists={this.state.booklists} logout={this.logout}/>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
            <BookBrowser/>
            </div>
            <div className="col-md-5">
            xxx
            </div>
          </div>
        </div>
      </div>
    );
  }

});

export default BookPanel;
