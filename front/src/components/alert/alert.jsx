import React from 'react';

let Alert = React.createClass({

  render: function(){

    let divCss = this.props.display ? "alert alert-danger alert-wall animated shake" : "hide";

    return <div className={divCss} ref={(ref) => this.self = ref}>
              <strong>Error:</strong> {this.props.content}
          </div>;
  }

});

export default Alert;
