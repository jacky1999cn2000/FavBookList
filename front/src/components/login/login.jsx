import React from 'react';
import Input from '../input/input';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import MessageBox from '../messagebox/messagebox';
import Auth from '../utils/auth';

let Login = React.createClass({

  getInitialState: function() {
	    return {
        login:{
          email:'',
          password:''
        },
        errors:{
          email:'initializing',
          password:'initializing'
        },
        messageType:'alert',
        messages:[]
	    };
	},

  setLoginState: function(event){
    let name = event.target.name;
    let value = event.target.value;
    this.state.login[name] = value;
    this.setState({login:this.state.login});
    return;
  },

  autoRefresh: function(){
    if(this.state.messageType == 'info'){
      if(this.state.messages.length > 0){
        this.state.messages.pop();
        setTimeout((function(){
          this.setState({messages:this.state.messages});
          browserHistory.push('/');
        }).bind(this), 1500);
      }
    }
  },

  login: function(event){
    event.preventDefault();

    let options = {};
    options.data = JSON.stringify({
      'username': this.state.login.email,
      'password': this.state.login.password
    });

    Auth.request(Auth.url + '/auth/login', this.loginCB, 'POST', options);
  },

  loginCB: function(response){
    if (response.target.readyState === 4) {
      let obj = JSON.parse(response.target.responseText);

      //if user already exists, set error message to state.errors.email and set messages to update UI
      if(obj.status == 'error'){
        this.state.messages = [obj.errorMessage];
        this.setState({messages:this.state.messages});
      }else{
        localStorage.token = obj.token;
        this.state.messageType = 'info';
        this.state.messages = ['Login Succeed! Redirecting to main page now.'];
        this.setState({messageType:this.state.messageType,messages:this.state.messages});
      }
    }
  },

  render: function(){
    let type = this.state.messageType;
    let messages = this.state.messages;
    let disabled = this.state.messageType == 'info';

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
            <div className="box-wall animated zoomInUp" id="login">
              <img className="profile-img" src="./img/snoopy.gif"/>
              <form className="form-signin">
                <Input type="text" placeholder="Email" name="email" value={this.state.login.email} onChange={this.setLoginState} error={this.state.errors.email} disabled={disabled} />
                <Input type="password" placeholder="Password" name="password" value={this.state.login.password} onChange={this.setLoginState} error={this.state.errors.password} disabled={disabled} />
                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Sign in</button>
                <Link to="/register" className="auth-redirect-link">Register</Link>
              </form>
            </div>
            <MessageBox type={type} messages={messages} autoRefresh={this.autoRefresh}/>
          </div>
        </div>
      </div>);
  }

});

export default Login;
