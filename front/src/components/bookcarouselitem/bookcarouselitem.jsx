import React from 'react';

let BookCarouselItem = React.createClass({

  render: function(){
    let divClass = this.props.i == 0 ? 'item active' : 'item';
    
    return (
      <div className={divClass}>
        <img src={this.props.item.images.large} alt="image not available"/>
      </div>
    );
  }
});

export default BookCarouselItem;
