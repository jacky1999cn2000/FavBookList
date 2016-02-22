import React from 'react';
import Input from '../input/input';
import {Link} from 'react-router';
import MessageBox from '../messagebox/messagebox';

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
        messages: []
	    };
	},

  /*
  *  This is the so-called controlled form, since all the input values were controlled by states
  */
  setRegisterState: function(event){
    let name = event.target.name;
    let value = event.target.value;
    this.state.register[name] = value;
    //reset error to initial state if user refocused on the input
    this.state.errors[name] = 'initializing';

    //for confirm input, add this extra code to handle button enablement
    if(name == 'confirm'){
      if(value == this.state.register.password){
        this.state.errors[name] = '';
      }else{
        this.state.errors[name] = 'Passwords don\'t match.';
      }
    }
    return this.setState({register:this.state.register,errors:this.state.errors});
  },

  /*
  * To validate each input when their onBlur event was triggered
  */
  validateData: function(event){
    switch (event.target.name) {
      case 'email':
        if(!this.state.register.email || this.state.register.email.indexOf('@') == -1){
          this.state.errors['email'] = 'Please input a valid email.'
          let newMBox = this.state.messages.slice();
          newMBox.push('Please input a valid email.');
          this.setState({errors:this.state.errors,messages:newMBox});
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

  register: function(event){
    event.preventDefault();
  },

  autoRefresh: function(messages){
    if(this.state.messages.length > 0){
      var newMBox = this.state.messages.slice();
      newMBox.shift();
      this.setState({messages:newMBox});
    }
  },

  render: function(){
    let type = (this.state.errors.email == '' && this.state.errors.password == '' && this.state.errors.confirm == '') ? 'info' : 'alert';

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
          <div className="box-wall animated zoomInUp" id="register">
              <img className="profile-img" src="./img/snoopy.gif"/>
              <form className="form-signin">
                <Input type="text" placeholder="Email" name="email" onChange={this.setRegisterState} onBlur={this.validateData} error={this.state.errors.email} />
                <Input type="password" placeholder="Password" name="password" onChange={this.setRegisterState} onBlur={this.validateData} error={this.state.errors.password} />
                <Input type="password" placeholder="Confirm Password" name="confirm" onChange={this.setRegisterState} onBlur={this.validateData} error={this.state.errors.confirm} />
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!!this.state.errors.email || !!this.state.errors.password || !!this.state.errors.confirm} onClick={this.register}>Register</button>

                <Link to="/login" className="auth-redirect-link">Login</Link>
              </form>
          </div>
          <MessageBox messages={this.state.messages} autoRefresh={this.autoRefresh} type={type}/>
        </div>
      </div>);
  }

});

export default Register;
