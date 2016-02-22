import React from 'react';
import Message from '../message/message';

let MessageBox = React.createClass({

  propTypes:{
    type: React.PropTypes.string.isRequired,
    messages: React.PropTypes.array.isRequired,
    autoRefresh: React.PropTypes.func,
    displayTime: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      displayTime: 5000
    };
  },

  componentDidMount: function(){
    if(this.props.autoRefresh){
      setInterval(this.props.autoRefresh,this.props.displayTime);
    }
  },

  render: function(){


    let messages = [];
    this.props.messages.forEach((message)=>{
      messages.push(<Message key={message} content={message} type={this.props.type}/>)
    });


    return (
        <div className="message-box">
          {messages}
        </div>
    );
  }

});

export default MessageBox;
