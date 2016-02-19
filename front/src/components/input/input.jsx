"use strict";

import React from 'react';

let Input = React.createClass({

  propTypes:{
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  render: function(){

    let wrapperClass;
    let spanItem;

    if(this.props.error == 'initializing'){
      wrapperClass = 'form-group';
      spanItem = null;
    }else if(this.props.error != ''){
      wrapperClass = 'form-group has-error has-feedback';
      spanItem = <span className='glyphicon glyphicon-remove form-control-feedback'></span>;
    }else{
      wrapperClass = 'form-group has-success has-feedback';
      spanItem = <span className='glyphicon glyphicon-ok form-control-feedback'></span>;
    }

    return (
      <div className={wrapperClass}>
        <input type={this.props.type}
            className="form-control"
            name={this.props.name}
            ref={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur} />
            {spanItem}
      </div>
    );
  }

});

export default Input;
