import React from 'react';

let Message = React.createClass({

  propTypes:{
    type: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired
  },

  render: function(){
    
    let spanItem, divClassName;

    if(this.props.type == 'alert'){
      divClassName = 'alert alert-danger animated shake';
      spanItem = <span className='glyphicon glyphicon-exclamation-sign'></span>;
    }else{
      divClassName = 'alert alert-success animated slideUpIn';
      spanItem = <span className='glyphicon glyphicon-info-sign'></span>;
    }

    return (
        <div className={divClassName} ref={(ref) => this.self = ref}>
          <strong>{spanItem}</strong> {this.props.content}
        </div>);
  }

});

export default Message;
