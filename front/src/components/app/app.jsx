import React from 'react';

let App = React.createClass({

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

});

export default App;
