import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import {Navbar, NavDropdown, NavItem, MenuItem, Nav} from 'react-bootstrap';
import SignUp from "./signup";
import Home from './Home';

class Main extends Component {

    constructor() {
        super();

        this.state = {
            user: null,
            link: 'home',
        };

        this.loginUser = this.loginUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.homeLink = this.homeLink.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    }

    loadUser() {
        if(!this.state.user) {
            var user = localStorage.getItem('MyAppUser');
            if(user) {
                this.setState({
                    user: JSON.parse(user)
                });
            }
        }
    }

    loginUser(user) {
        localStorage.setItem('MyAppUser', JSON.stringify(user));
        this.setState({user, link: 'home'});
    }

    handleLogin(event) {
        if(!this.state.user) {
            this.setState({
                link: 'login'
            })
        } else {
            localStorage.removeItem('MyAppUser');
            this.setState({
                user: null
            });
        }
    }

    homeLink(event) {
        this.setState({
            link: 'home'
        });
    }

    handleSignUp(event) {
        this.setState({
           link: 'signup'
        });
    }

    checkIfLoggedIn(event) {
        if(!this.state.user) {
            alert('Not Logged In');
        }  else {
            alert('Logged In');
        }
    }
    render() {
        this.loadUser();
        var that = this;
        function Route() {
            switch (that.state.link) {
                case 'home':
                    return <Home/>
                case 'login':
                    return <Login LoginHandler={that.loginUser}/>
                case 'signup':
                    return <SignUp LoginHandler={that.loginUser}/>
                default :
                    return <h1></h1>
            }
        }
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
                            <NavItem eventKey={1} href="#" onClick={this.homeLink}>
                                Home
                            </NavItem>
                            <NavItem eventKey={2} href="#" onClick={this.checkIfLoggedIn}>
                                Check if LoggedIn
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#" onClick={this.handleLogin}>
                                {this.state.user!=null?'Logout':'Login'}
                            </NavItem>
                            <NavItem eventKey={2} href="#" onClick={this.handleSignUp}>
                                {this.state.user!=null?'':'Sign up'}
                            </NavItem>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {Route()}
            </div>
        );
    }
}

export default Main;
