import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';


let NavBar = React.createClass({

  logout: function(){
    console.log('logout');
    delete localStorage.token;
    setTimeout((function(){
      browserHistory.push('/login');
    }),1000);
  },

  render: function(){

    return (
      <Navbar inverse>

        <Navbar.Header>
          <img className="logo-img" src="./img/snoopy.gif"/>
          <Navbar.Brand>
            <Link to="/">Book Club</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem onClick={this.logout}>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }

});

export default NavBar;
