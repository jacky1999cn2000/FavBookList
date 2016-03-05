import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

let WelcomePage = React.createClass({

  render: function(){

    return (
      <Jumbotron>
         <h1>Hello, reader!</h1>
         <br/>
         <p>Select a BookList to view your book collections, or click the button below to create a new one.</p>
         <br/>
         <p><Button bsStyle="primary">Create another BookList</Button></p>
       </Jumbotron>
    );
  }
});

export default WelcomePage;
