import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../login.css';
import axios from 'axios';

//create the Owner Login Component
class OwnerLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            authFlag: false,
            fields: {},//validation
            errors: {}//validation
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
    handleValidation() {//validation
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }
        // if (typeof fields["ID"] !== "undefined") {
        //     console.log("maus");
        //     if (!fields["ID"].match(/^\d+$/)) {
        //         formIsValid = false;
        //         errors["ID"] = "Only numbers allowed";
        //     }
        // }
        this.setState({ errors: errors });
        return formIsValid;
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
        if (!this.handleValidation()) {
            console.log("Form has validation errors");
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        if (!this.handleValidation()) {
            console.log("Please rectify the validation errors in the form");

        } else {
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
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            password: e.target.value
        })
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/ownerLogin" />
        }
        else if (this.state.authFlag) {
            redirectVar = <Redirect to="/" />
        }
        else if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>{redirectVar}

                <div class="container login-container">
                    <div class="row login-form">
                        <div class="col-md-6 image">
                            <img alt="HomeAway logo" class="site-header-logo__img img-responsive"
                                role="presentation" src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png">
                            </img>
                        </div>
                        <div class="col-md-6">
                            <h3>Owner Login</h3>
                                <div class="col-md-6">
                                    <h4>&nbsp;Need an account? </h4>
                                </div>
                                <div class="col-md-6" >
                                    <h4 class="ForgetPwd"><a href="/ownerRegistration" class="ForgetPwd" value="Login">Sign Up</a></h4>
                                </div>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <input type="text" refs="username" onChange={this.usernameChangeHandler.bind(this, "username")} class="form-control" placeholder="Your Email" />
                                    <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="password" refs="password" onChange={this.passwordChangeHandler.bind(this, "password")} class="form-control" placeholder="Your Password" />
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                </div>
                                <div class="form-group">

                                    <a href="#" class="ForgetPwd" value="Login">Forget Password?</a>
                                </div>
                                <div class="form-group">
                                    <input onClick={this.submitLogin} type="submit" class="btnSubmit" value="Login" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OwnerLogin;