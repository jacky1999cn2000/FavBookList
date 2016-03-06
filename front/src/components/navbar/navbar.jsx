import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';


let NavBar = React.createClass({

  menuItemHandler: function(item, e) {
      e.preventDefault();
      this.props.selectBooklist(item);
	},

  //build menu items (if no booklists yet, then don't need empty array and divider in the menu)
  booklistsMenuItems: function(booklists){
    let booklistsMenuItems = [];

    if(booklists.length > 0){
      booklists.map((item, i) => {
        let boundMenuItemHandler = this.menuItemHandler.bind(this, item);
        let menuItem = <MenuItem key={item.id} onClick={boundMenuItemHandler}>{item.name}</MenuItem>;
        booklistsMenuItems.push(menuItem)
      });
      booklistsMenuItems.push(<MenuItem key={0} divider />);
      booklistsMenuItems.push(<MenuItem key={1}>Create anoter BookList</MenuItem>);
    }else{
      booklistsMenuItems.push(<MenuItem key={1}>Create your first BookList now!</MenuItem>);
    }

    return booklistsMenuItems;
  },


  render: function(){
    
    let booklistsMenuItems = this.booklistsMenuItems(this.props.booklists);

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
              {booklistsMenuItems}
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={this.props.logout}>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }

});

export default NavBar;
