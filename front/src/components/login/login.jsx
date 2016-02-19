import React from 'react';
import Input from '../input/input';
import {Link} from 'react-router';

let Login = React.createClass({

  getInitialState: function() {
	    return {
        login:{
          email:'',
          password:''
        }
	    };
	},

  setLoginState: function(event){
    let name = event.target.name;
    let value = event.target.value;
    this.state.login[name] = value;
    return this.setState({login:this.state.login});
  },

  render: function(){

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
          <div className="box-wall animated zoomInUp" id="login">
            <img className="profile-img" src="./img/snoopy.gif"/>
            <form className="form-signin">
              <Input type="text" placeholder="Email" name="email" value={this.state.login.email} onChange={this.setLoginState} />
              <Input type="password" placeholder="Password" name="password" value={this.state.login.password} onChange={this.setLoginState} />
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              <Link to="/register" className="auth-redirect-link">Register</Link>
            </form>
          </div>
        </div>
      </div>);
  }

});

export default Login;
