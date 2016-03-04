import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
var BooklistActionCreator = require('../flux_actions/BooklistActionCreator');
var BooklistStore = require('../flux_stores/BooklistStore');

let NavBar = React.createClass({

  getInitialState: function(){
    return {
      booklists: BooklistStore.getBooklists()
    }
  },

  componentDidMount: function(){
    BooklistStore.addChangeListener(this.onBooklistsChange);
    BooklistActionCreator.retrieveBooklists();
  },

  componentWillUnmount: function(){
    BooklistStore.removeChangeListener(this.onBooklistsChange);
  },

  onBooklistsChange: function(){
    console.log('onBooklistsChange');
    console.log('booklists ',BooklistStore.getBooklists());
    this.setState({booklists: BooklistStore.getBooklists()});
  },

  logout: function(){
    delete localStorage.token;
    setTimeout((function(){
      browserHistory.push('/login');
    }),1000);
  },

  menuItemHandler: function(item, e) {


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
          <Nav>
            <NavDropdown title="Select a BookList" id="dropdown-menu">
              {
                this.state.booklists.map((item, i) => {
                  console.log('item ',item);
                  let boundMenuItemHandler = this.menuItemHandler.bind(this, item);
                  return (
                    <MenuItem key={item.id}>{item.name}</MenuItem>
                  )
                })
              }

            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={this.logout}>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }

});

export default NavBar;
