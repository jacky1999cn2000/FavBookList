import React from 'react';
import NavBar from '../navbar/navbar';
import WelcomePage from '../welcomepage/welcomepage';
import BookBrowser from '../bookbrowser/bookbrowser';
import BookCollection from '../bookcollection/bookcollection';

import {browserHistory} from 'react-router';

import BooklistActionCreator from '../flux_actions/BooklistActionCreator';
import BookActionCreator from '../flux_actions/BookActionCreator';
import BooklistStore from '../flux_stores/BooklistStore';
import BookStore from '../flux_stores/BookStore';

/*
* BookPanel compoenent will be the controlling view, all states will be managed here
*/
let BookPanel = React.createClass({

  getInitialState: function(){
    return {
      booklists: BooklistStore.getBooklists(), //booklists for current user
      books: BookStore.getBooks(), //books for current booklist (currentBKL)
      panelName: 'WelcomePage', //control which panel to display
      currentBKL: {}, //currently selected booklist
    }
  },

  componentDidMount: function(){
    //register BooklistStore & BookStore
    BooklistStore.addChangeListener(this.onBooklistChange);
    BooklistStore.addAuthfailListener(this.onBooklistFail);
    BookStore.addChangeListener(this.onBookChange);
    BookStore.addFailListener(this.onBookFail);

    //fire action to retrieve all booklists
    BooklistActionCreator.retrieveBooklists();
  },

  componentWillUnmount: function(){
    //unregister BooklistStore & BookStore
    BooklistStore.removeChangeListener(this.onBooklistsChange);
    BooklistStore.removeAuthfailListener(this.onBooklistFail);
    BookStore.removeChangeListener(this.onBookChange);
    BookStore.removeFailListener(this.onBookFail);
  },

  onBooklistChange: function(){
    this.setState({booklists: BooklistStore.getBooklists()});
  },

  //jwt's expiration is 1 day, in case it expired(typically user should close browser before expiration), just logout
  onBooklistFail: function(){
    this.logout();
  },

  onBookChange: function(){
    this.setState({books: BookStore.getBooks()});
  },

  onBookFail: function(){
    console.error('onBookFail: Something Wrong...');
  },

  logout: function(){
    delete localStorage.bookclubtoken;
    setTimeout((function(){
      browserHistory.push('/login');
    }),1000);
  },

  selectBooklist: function(booklist){
    this.setState({currentBKL:booklist,panelName:'BooksView'});

    //fire action to retrieve all books for given booklist
    BookActionCreator.retrieveBooks(booklist.id);
  },

  getBookPanel: function(panelName){

    switch (panelName) {
      case 'BooksView':
        return (
          <div className="row">
            <div className="col-md-7">
              <BookBrowser currentBKL={this.state.currentBKL}/>
            </div>
            <div className="col-md-5">
              <BookCollection books={this.state.books}/>
            </div>
          </div>
        );
      default:
        return <WelcomePage/>;
    }
  },

  render: function(){

    let panelContent = this.getBookPanel(this.state.panelName);

    return (
      <div>
        <NavBar booklists={this.state.booklists} logout={this.logout} selectBooklist={this.selectBooklist}/>
        <div className="container">
            {panelContent}
        </div>
      </div>
    );
  }

});

export default BookPanel;
