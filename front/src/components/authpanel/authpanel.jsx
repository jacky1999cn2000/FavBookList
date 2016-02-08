import React from 'react';
import Login from '../login/login';

let AuthPanel = React.createClass({

  render: function(){

    return <div className="row" id="authpanel">
              <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
                <Login/>
              </div>
          </div>;
  }
});

export default AuthPanel;
