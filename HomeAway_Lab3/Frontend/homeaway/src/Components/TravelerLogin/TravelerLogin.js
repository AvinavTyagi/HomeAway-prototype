import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../login.css';
import axios from 'axios';

//create the Traveller Login Component
class TravelerLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            authFlag: false,
            fields: {},
            errors: {}
        }
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        if (!this.handleValidation()) {
            console.log("Please rectify the validation errors in the form");

        } else {
            console.log("DATA: " + data.username + data.password);
            axios.post('http://localhost:3001/login', data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        this.setState({
                            authFlag: true
                        })
                    } else if (response.status === 401) {
                        this.setState({
                            authFlag: false
                        })
                    }
                });
        }
    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (field, e) => {
        // let fields = this.state.fields;
        // fields[field] = e.target.value;
        // this.setState({ fields });
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (field, e) => {
        // let fields = this.state.fields;
        // fields[field] = e.target.value;
        this.setState({
            password: e.target.value
        })
    }
    handleValidation() {
        return true;
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/travelerLogin" />
        }
        else if (this.state.authFlag) {
            redirectVar = <Redirect to="/" />
        }
        else if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container login-container1">
                    <div class="row">
                        <div class="col-md-12 login-form" id="travelerform">
                            <h3>Log in to HomeAway</h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>&nbsp;Need an account? </h4>
                                </div>
                                <div class="col-md-6" >
                                    <h4 class="ForgetPwd"><a href="/userRegistration" class="ForgetPwd" value="Login">Sign Up</a></h4>
                                </div>
                            </div>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Your Email *" value="" />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="Your Password *" value="" />
                                </div>
                                <div class="form-group">

                                    <a href="#" class="ForgetPwd" value="Login">Forget Password?</a>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btnSubmit" value="Login" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TravelerLogin;