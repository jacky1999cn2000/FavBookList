import React from 'react';
import NavBar from '../navbar/navbar';
import WelcomePage from '../welcomepage/welcomepage';
import BookBrowser from '../bookbrowser/bookbrowser';
import BookCollection from '../bookcollection/bookcollection';

import {browserHistory} from 'react-router';

import BooklistActionCreator from '../flux_actions/BooklistActionCreator';
import BooklistStore from '../flux_stores/BooklistStore';

/*
* BookPanel compoenent will be the controlling view, all states will be managed here
*/
let BookPanel = React.createClass({

  getInitialState: function(){
    return {
      booklists: BooklistStore.getBooklists(),
      currentBKL: {}, //currently selected booklist
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
    delete localStorage.bookclubtoken;
    setTimeout((function(){
      browserHistory.push('/login');
    }),1000);
  },

  setCurrentBKL: function(item){
    this.setState({currentBKL:item});
  },

  getBookPanel: function(){

    return (
      <div className="row">
        <div className="col-md-7">
          <div>
            <BookBrowser currentBKL={this.state.currentBKL}/>
          </div>
        </div>

        <div className="col-md-5">
          <BookCollection/>
        </div>
      </div>
    );
  },

  render: function(){

    let bookPanel = typeof this.state.currentBKL.name == "undefined" ? <WelcomePage/> : this.getBookPanel();

    return (
      <div>
        <NavBar booklists={this.state.booklists} logout={this.logout} setCurrentBKL={this.setCurrentBKL}/>
        <div className="container">
            {bookPanel}
        </div>
      </div>
    );
  }

});

export default BookPanel;
