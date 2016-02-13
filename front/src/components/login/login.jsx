import React from 'react';

let Login = React.createClass({

  test: function(){
    console.log('blurred');
  },

  render: function(){

    let displayCss = (this.props.display) ? "box-wall animated zoomInUp" : "hide";
    return <div className={displayCss} id="login">
              <img className="profile-img" src="./assets/snoopy.gif"/>
              <form className="form-signin">
                <input type="text" className="form-control" placeholder="Email" onBlur={this.test} autofocus></input>
                <input type="password" className="form-control" placeholder="Password" required></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <a href="#" className="registerorlogin" onClick={this.props.toggle}>Register</a>
              </form>
           </div>;
  }

});

export default Login;
