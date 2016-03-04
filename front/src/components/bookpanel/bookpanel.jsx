import React from 'react';
import NavBar from '../navbar/navbar';
import BookBrowser from '../bookbrowser/bookbrowser';
import {browserHistory} from 'react-router';
import BooklistActionCreator from '../flux_actions/BooklistActionCreator';
import BooklistStore from '../flux_stores/BooklistStore';

let BookPanel = React.createClass({

  getInitialState: function(){
    return {
      booklists: BooklistStore.getBooklists()
    }
  },

  componentDidMount: function(){
    BooklistStore.addChangeListener(this.onBooklistsChange);
    BooklistStore.addAuthfailListener(this.onAuthFail);
    BooklistActionCreator.retrieveBooklists();
  },

  componentWillUnmount: function(){
    BooklistStore.removeChangeListener(this.onBooklistsChange);
    BooklistStore.removeAuthfailListener(this.onAuthFail);
  },

  onBooklistsChange: function(){
    console.log('onBooklistsChange');
    console.log('booklists ',BooklistStore.getBooklists());
    this.setState({booklists: BooklistStore.getBooklists()});
  },

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
