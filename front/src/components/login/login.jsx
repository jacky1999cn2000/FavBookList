import React from 'react';

let Login = React.createClass({

  render: function(){

    return <div className="box-wall" id="login">
              <img className="profile-img" src="./assets/snoopy.gif"/>
              <form className="form-signin">
                <input type="text" className="form-control" placeholder="Email" required autofocus></input>
                <input type="password" className="form-control" placeholder="Password" required></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <a href="#" className="register">Register</a><span className="clearfix"></span>
              </form>
           </div>;

  }
});

export default Login;
