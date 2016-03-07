import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';

let NobooksPage = React.createClass({

  render: function(){

    return (
      <Jumbotron>
         <h1>Hello again, reader!</h1>
         <br/>
         <p>It seemed you haven't added any books into collection <mark><strong>{this.props.currentBKL.name}</strong></mark>, please click the button below to find interesting books!</p>
         <br/>
         <p><Button bsStyle="primary">Add book into my BookList</Button></p>
       </Jumbotron>
    );
  }
});

export default NobooksPage;
