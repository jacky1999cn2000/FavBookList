import React from 'react';

let BookCollectionItem = React.createClass({

  render: function(){
    return (
      <li className="col-sm-3">
          <a className="thumbnail"><img src={this.props.item.images.medium}/></a>
      </li>
    );
  }
});

export default BookCollectionItem;
