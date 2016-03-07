import React from 'react';

let BookCollectionItem = React.createClass({

  render: function(){
    return (

      <li className="col-sm-3" >
        <div onClick={this.props.onClick}>
          <a className="thumbnail pointer hover"><img src={this.props.item.images.medium}/></a>
        </div>
      </li>

    );
  }
});

export default BookCollectionItem;
