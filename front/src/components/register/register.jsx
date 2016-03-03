import React from 'react';
import Input from '../input/input';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import MessageBox from '../messagebox/messagebox';
import Auth from '../utils/auth';

let Register = React.createClass({

  getInitialState: function() {
	    return {
        register:{
          email:'',
          password:'',
          confirm:''
        },
        errors:{
          email:'initializing',
          password:'initializing',
          confirm:'initializing'
        },
        messageType:'alert',
        messages:[]
	    };
	},

  /*
  *  This is the so-called controlled form, since all the input values were controlled by states
  */
  setRegisterState: function(event){
    let name = event.target.name;
    let value = event.target.value;
    this.state.register[name] = value;

    //reset error to initial state & messageType to alert if user refocused on the input
    this.state.errors[name] = 'initializing';
    this.state.messageType = 'alert';

    //reset confirm if reinput password
    if(name == 'password'){
      this.state.register['confirm'] = '';
      this.state.errors['confirm'] = 'initializing';
      //enable confirm input if criteria met
      if(this.state.register['password'] && this.state.register.password.length >= 6){
        this.state.errors.password = '';
      }
    }

    //for confirm input, add this extra code to handle button enablement
    if(name == 'confirm'){
      if(value == this.state.register.password){
        this.state.errors[name] = '';
      }else{
        this.state.errors[name] = 'Passwords don\'t match.';
      }
    }

    this.setState({messageType:this.state.messageType,register:this.state.register,errors:this.state.errors});
    return;
  },

  /*
  * To validate each input when their onBlur event was triggered
  */
  validateData: function(event){
    switch (event.target.name) {
      case 'email':
        if(!this.state.register.email || this.state.register.email.indexOf('@') == -1){
          this.state.errors['email'] = 'Please input a valid email.'
          this.setState({errors:this.state.errors});
          break;
        }
        this.state.errors['email'] = '';
        this.setState({errors:this.state.errors});
        break;
      case 'password':
        if(!this.state.register.password || this.state.register.password.length < 6){
          this.state.errors['password'] = 'Password should have at least 6 characters.';
          this.setState({errors:this.state.errors});
          break;
        }
        this.state.errors['password'] = '';
        this.setState({errors:this.state.errors});
        break;
      case 'confirm':
        if(!this.state.register.confirm || this.state.register.confirm != this.state.register.password){
          this.state.errors['confirm'] = 'Passwords don\'t match.';
          this.setState({errors:this.state.errors});
          break;
        }
        this.state.errors['confirm'] = '';
        this.setState({errors:this.state.errors});
        break;
      default:
        return;
    }
  },

  getObjectValues: function(dataObject){
    let dataArray = new Array;
    for(let o in dataObject) {
        dataArray.push(dataObject[o]);
    }
    return dataArray;
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

  register: function(event){
    event.preventDefault();

    let data = JSON.stringify({
      'username': this.state.register.email,
      'password': this.state.register.password
    });

    Auth.request(Auth.url + '/auth/register', this.registerCB, data);
  },

  registerCB: function(response){
    if (response.target.readyState === 4) {
      let obj = JSON.parse(response.target.responseText);

      //if user already exists, set error message to state.errors.email and set messages to update UI
      if(obj.status == 'error'){
        this.state.errors.email = obj.errorMessage;
        this.setState({errors:this.state.errors});
      }else{
        this.state.messageType = 'info';
        this.state.messages = ['Registration Succeed! Redirecting to Login page now.'];
        this.setState({messageType:this.state.messageType,messages:this.state.messages});
      }
    }
  },

  render: function(){

    let type = this.state.messageType;
    let messages = type == 'info' ? this.state.messages : this.getObjectValues(this.state.errors);
    let disabled_during_edit = this.state.errors['password'] != '';
    let disabled_during_redirect = this.state.messages.length > 0;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
          <div className="box-wall animated zoomInUp" id="register">
              <img className="profile-img" src="./img/snoopy.gif"/>
              <form className="form-signin">
                <Input type="text" placeholder="Email" name="email" value={this.state.register.email} onChange={this.setRegisterState} onBlur={this.validateData} error={this.state.errors.email} disabled={disabled_during_redirect}/>
                <Input type="password" placeholder="Password" name="password" value={this.state.register.password} onChange={this.setRegisterState} onBlur={this.validateData} error={this.state.errors.password} disabled={disabled_during_redirect}/>
                <Input type="password" placeholder="Confirm Password" name="confirm" value={this.state.register.confirm} onChange={this.setRegisterState} onBlur={this.validateData} error={this.state.errors.confirm} disabled={disabled_during_edit || disabled_during_redirect}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!!this.state.errors.email || !!this.state.errors.password || !!this.state.errors.confirm} onClick={this.register}>Register</button>
                <Link to="/login" className="auth-redirect-link">Login</Link>
              </form>
          </div>
          <MessageBox type={type} messages={messages} autoRefresh={this.autoRefresh}/>
        </div>
      </div>);
  }

});

export default Register;
