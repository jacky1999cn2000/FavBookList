import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../login/login';
import Register from '../register/register';
import Alert from '../alert/alert';

let AuthPanel = React.createClass({

  getInitialState: function() {
	    return {
        showLogin:true,
        showAlert:false,
        alertContent:''
	    };
	},

  toggle: function(){
    this.setState({showLogin:!this.state.showLogin});
  },

  showAlert: function(alertContent){
    this.setState({showAlert:true,alertContent:alertContent});
    setTimeout(()=>{
      this.setState({showAlert:false,alertContent:''});
    },6000);
  },

  //didn't care about uniqueness
  handleClassNames: function(className, toAdd, toRemove){
    let classNameArray = className.split(' ');
    console.log('classNameArray ',classNameArray);
    //add
    classNameArray = classNameArray.concat(toAdd.split(' '));
    console.log('classNameArray add ',classNameArray);
    //remove
    toRemove.split(' ').forEach((ele)=>{
      if(classNameArray.indexOf(ele) != -1){
        classNameArray.splice(classNameArray.indexOf(ele), 1);
      }
    });
    console.log('classNameArray remove ',classNameArray);
    return classNameArray.join(' ');
  },

  render: function(){

    return (<div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-4 col-md-offset-4">
                    <Login id="login" display={this.state.showLogin} toggle={this.toggle}/>
                    <Register id="register" display={!this.state.showLogin} toggle={this.toggle} showAlert={this.showAlert} hideAlert={this.hideAlert} handleClassNames={this.handleClassNames}/>
                    <Alert display={this.state.showAlert} content={this.state.alertContent} hideAlert={this.hideAlert}/>
                  </div>
                </div>
            </div>);
  }
});

export default AuthPanel;
