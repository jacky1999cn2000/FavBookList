import React from 'react';

let Register = React.createClass({

  getInitialState () {
    return {
      emailValue: '',
      passwordValue: '',
      confirmValue: '',
      validEmail: false,
      validPassword: false,
      validConfirm: false
    }
  },

  emailOnChange: function(e){
    this.setState({emailValue:e.target.value});
  },

  emailOnFocus: function(){
    this.setState({validEmail:false});
    this.email.className = this.props.handleClassNames(this.email.className,'','correct-input wrong-input');
  },

  emailOnBlur: function(){
    let value = this.state.emailValue;
    if(!value || value.indexOf('@') == -1){
      this.props.showAlert('Input a valid email address.');
      this.email.className = this.props.handleClassNames(this.email.className,'wrong-input','');
    }else{
      this.setState({validEmail:true});
      this.email.className = this.props.handleClassNames(this.email.className,'correct-input','');
    }
  },

  passwordOnChange: function(e){
    this.setState({passwordValue:e.target.value});
  },

  passwordOnFocus: function(){
    this.setState({validPassword:false});
    this.password.className = this.props.handleClassNames(this.password.className,'','correct-input wrong-input');
  },

  passwordOnBlur: function(){
    let value = this.state.passwordValue;
    if(!value || value.length < 6){
      this.props.showAlert('Input a valid password (6 letter minimum).');
      this.password.className = this.props.handleClassNames(this.password.className,'wrong-input','');
    }else{
      this.setState({validPassword:true});
      this.password.className = this.props.handleClassNames(this.password.className,'correct-input','');
    }
  },

  confirmOnChange: function(e){
    if(e.target.value == this.state.passwordValue){
      this.setState({validConfirm:true});
    }
    this.setState({confirmValue:e.target.value});
  },

  confirmOnFocus: function(){
    this.setState({validConfirm:false});
    this.confirm.className = this.props.handleClassNames(this.confirm.className,'','correct-input wrong-input');
  },

  confirmOnBlur: function(){
    let value = this.state.confirmValue;
    if(!value || value != this.state.passwordValue){
      this.props.showAlert('Passwords didn\'t match.');
      this.confirm.className = this.props.handleClassNames(this.confirm.className,'wrong-input','');
    }else{
      this.setState({validConfirm:true});
      this.confirm.className = this.props.handleClassNames(this.confirm.className,'correct-input','');
    }
  },

  render: function(){

    let displayCss = (this.props.display) ? "box-wall animated zoomInUp" : "hide";
    return <div className={displayCss} id="register">
              <img className="profile-img" src="./assets/snoopy.gif"/>
              <form className="form-signin">
                <input type="text" className="form-control" placeholder="Email" ref={(ref) => this.email = ref} onChange={this.emailOnChange} onFocus={this.emailOnFocus} onBlur={this.emailOnBlur} autofocus></input>
                <input type="password" className="form-control" placeholder="Password" ref={(ref) => this.password = ref} onChange={this.passwordOnChange} onFocus={this.passwordOnFocus} onBlur={this.passwordOnBlur}></input>
                <input type="password" className="form-control" placeholder="Confirm Password" ref={(ref) => this.confirm = ref} onChange={this.confirmOnChange} onFocus={this.confirmOnFocus} onBlur={this.confirmOnBlur}></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!this.state.validEmail || !this.state.validPassword || !this.state.validConfirm }>Register</button>
                <a href="#" className="registerorlogin" onClick={this.props.toggle}>Login</a><span className="clearfix"></span>
              </form>
          </div>;
  }

});

export default Register;
