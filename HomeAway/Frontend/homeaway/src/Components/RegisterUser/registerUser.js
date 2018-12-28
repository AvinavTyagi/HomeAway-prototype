import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../login.css';
import axios from 'axios';

//create the Owner Login Component
class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            firstName:"",
            lastName:"",
            authFlag: false,
            fields: {},
            errors: {}
        }
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
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
            email: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        if (!this.handleValidation()) {
            console.log("Please rectify the validation errors in the form");

        } else {
            axios.post('http://localhost:3001/ownerRegistration', data)
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
    firstNameChangeHandler = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameChangeHandler = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            lastName: e.target.value
        })
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "Cannot be empty";
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "Cannot be empty";
        }
        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "Cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }
    render() {
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/" />
        }
        else if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/userRegistration" />
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
                            <h3>User Registration</h3>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <input type="text" refs="username" onChange={this.usernameChangeHandler.bind(this, "username")} class="form-control" placeholder="Your Email" ></input>
                                    <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="password" refs="password" onChange={this.passwordChangeHandler.bind(this, "password")} class="form-control" placeholder="Your Password" ></input>
                                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" refs="firstName" onChange={this.firstNameChangeHandler.bind(this, "firstName")} class="form-control" placeholder="Your First Name" ></input>
                                    <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" refs="lastName" onChange={this.lastNameChangeHandler.bind(this, "lastName")} class="form-control" placeholder="Your Last Name" ></input>
                                    <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                                </div>
                                <div class="form-group">
                                    <input onClick={this.submitLogin} type="submit" class="btnSubmit" value="Register" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterUser;