import React from 'react';
import NavBar from '../navbar/navbar';
import BookBrowser from '../bookbrowser/bookbrowser';

let BookPanel = React.createClass({

  render: function(){

    return (
      <div>
        <NavBar/>
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
