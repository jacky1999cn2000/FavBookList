import React from 'react';


let BookBrowser = React.createClass({

  getInitialState() {
    return {
      index: 0,
      direction: null
    };
  },

  handleSelect(selectedIndex, selectedDirection) {
    alert('selected=' + selectedIndex + ', direction=' + selectedDirection);
    this.setState({
      index: selectedIndex,
      direction: selectedDirection
    });
  },

  render: function() {
    return (
      <div>
      ss
      </div>
    );
  }
});

export default BookBrowser;
