import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import {Navbar, NavDropdown, NavItem, MenuItem, Nav} from 'react-bootstrap';

class Main extends Component {

    constructor() {
        super();

        this.state = {
            user: null,
        };

        this.loginUser = this.loginUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loginUser(user) {
        console.log('he', user);
        this.setState({user});
    }

    handleLogin(event) {
        if(!this.state.user) {

        } else {
            this.setState({
                user: null
            });
        }
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#brand">MyApp</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                Home
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#" onClick={this.handleLogin}>
                                {this.state.user!=null?'Logout':'Login'}
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Login LoginHandler={this.loginUser}/>
            </div>
        );
    }
}

export default Main;
