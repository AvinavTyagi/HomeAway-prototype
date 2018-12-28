import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';

//create the Traveller Login Component
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            about: '',
            address: '',
            company: '',
            school: '',
            hometown: '',
            languages: '',
            gender: '',
            phone: '',
            listed: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.firstNameHandler = this.firstNameHandler.bind(this);
        // this.lastNameHandler = this.lastNameHandler.bind(this);
        // this.aboutHandler = this.aboutHandler.bind(this);
        // this.addressHandler = this.addressHandler.bind(this);
        // this.companyHandler = this.companyHandler.bind(this);
        // this.schoolHandler = this.schoolHandler.bind(this);
        // this.hometownHandler = this.hometownHandler.bind(this);
        // this.languagesHandler = this.languagesHandler.bind(this);
        // this.genderHandler = this.genderHandler.bind(this);
        // this.phoneHandler = this.phoneHandler.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    firstNameHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }
    aboutHandler = (e) => {
        this.setState({
            about: e.target.value
        })
    }
    addressHandler = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    companyHandler = (e) => {
        this.setState({
            company: e.target.value
        })
    }
    schoolHandler = (e) => {
        this.setState({
            school: e.target.value
        })
    }
    hometownHandler = (e) => {
        this.setState({
            hometown: e.target.value
        })
    }
    languagesHandler = (e) => {
        this.setState({
            languages: e.target.value
        })
    }
    genderHandler = (e) => {
        this.setState({
            gender: e.target.value
        })
    }
    phoneHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }
    componentDidMount() {
        let owner = '';
        owner = cookie.load('cookie');
        const data = {
            email: owner
        }
        axios.post('http://localhost:3001/loadProfile', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    let firstName = response.data[0].firstName;
                    console.log(firstName);
                    this.setState({
                        firstName: response.data[0].firstName,
                        lastName: response.data[0].lastName,
                        about: response.data[0].about,
                        address: response.data[0].address,
                        company: response.data[0].company,
                        school: response.data[0].school,
                        hometown: response.data[0].hometown,
                        languages: response.data[0].languages,
                        gender: response.data[0].gender,
                        phone: response.data[0].phone
                    })
                } else if (response.status === 400) {
                    this.setState({
                        listed: false
                    })
                }
            });
        this.setState({
            authFlag: false
        })
    }
    submitHandler = (e) => {
        let owner = '';
        e.preventDefault();
        owner = cookie.load('cookie');
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            about: this.state.about,
            address: this.state.address,
            company: this.state.company,
            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages,
            gender: this.state.gender,
            phone: this.state.phone,
            email: owner
        }
        //let formData = new FormData();
        // formData.append('description', description);
        // formData.append('selectedFile', selectedFile);

        axios.post('http://localhost:3001/updateUser', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        listed: true
                    })
                } else if (response.status === 400) {
                    this.setState({
                        listed: false
                    })
                }
            });

    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/ownerLogin" />
        }
        else if (this.state.listed) {
            redirectVar = <Redirect to="/profile" />
        }
        return (
            <div>{redirectVar}
                <section class="container">
                    <div class="row tab-content">
                        <div id="profileInfo" role="tabpanel">
                            <header class="text-center">
                                <div>
                                    <h2 class="user-name">{this.state.firstName} {this.state.lastName}</h2>
                                </div>
                            </header>
                            <div class="col-xs-12 col-sm-8">
                                <div>
                                    <div>
                                        <div class="section-with-border">
                                            <div class="row">
                                                <div class="col-xs-8 hidden-xs">
                                                    <h3 class="section-header">
                                                        Profile information
                                                </h3>
                                                </div>
                                            </div>
                                            <form role="form" class="js-profile-form">
                                                <div class="row form-group ">
                                                    <label class="col-xs-12 sr-only" for="profileFirstNameInput">First name</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileFirstNameInput" placeholder="First name" value={this.state.firstName} onChange={this.firstNameHandler.bind(this)} data-input-model-name="firstName" maxlength="100" required="">

                                                        </input></div>
                                                </div>
                                                <div class="row form-group ">
                                                    <label class="col-xs-12 sr-only" for="profileLastNameInput">Last name or initial</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileLastNameInput" placeholder="Last name or initial" value={this.state.lastName} onChange={this.lastNameHandler.bind(this)} data-input-model-name="lastName" maxlength="100" required="">

                                                        </input></div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileAboutInput">About me</label>
                                                    <div class="col-xs-12">
                                                        <textarea type="text" class="form-control input-lg js-input-field" rows="4" id="profileAboutInput" placeholder="About me" value={this.state.about} onChange={this.aboutHandler.bind(this)} data-input-model-name="about" maxlength="4000"></textarea>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileCityInput">Current City</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileCityInput" placeholder="My city, country" value={this.state.address} onChange={this.addressHandler.bind(this)} data-input-model-name="currentCity" maxlength="80">
                                                        </input> </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileCompanyInput">Company</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileCompanyInput" placeholder="Company" value={this.state.company} onChange={this.companyHandler.bind(this)} data-input-model-name="company" maxlength="100">
                                                        </input> </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileSchoolInput">School</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileSchoolInput" placeholder="School" value={this.state.school} onChange={this.schoolHandler.bind(this)} data-input-model-name="school" maxlength="100">
                                                        </input></div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileHometownInput">Hometown</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileHometownInput" placeholder="Hometown" value={this.state.hometown} onChange={this.hometownHandler.bind(this)} data-input-model-name="hometown" maxlength="80">
                                                        </input></div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileLanguageInput">Languages</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileLanguageInput" placeholder="Languages" value={this.state.languages} onChange={this.languagesHandler.bind(this)} data-input-model-name="languages" maxlength="100">
                                                        </input></div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="profileGenderInput">Gender</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profileGenderInput" placeholder="Gender" value={this.state.gender} onChange={this.genderHandler.bind(this)} data-input-model-name="gender" maxlength="100">
                                                        </input>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-xs-12 sr-only" for="phone0">Phone number</label>
                                                    <div class="col-sm-12 col-md-7">
                                                        <input type="text" class="form-control input-lg js-input-field" id="profilePhoneInput" placeholder="Phone Number" value={this.state.phone} onChange={this.phoneHandler.bind(this)} data-input-model-name="phone" maxlength="100">
                                                        </input>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="profile-form-footer">
                                            <button type="submit" class="btn btn-primary hidden-xs js-submit-profile" onClick= {this.submitHandler.bind(this)} data-loading-text="Sending...">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 hidden-xs">
                                {/* <div class="section-with-border">
                                    <h3 class="section-header">Verifications</h3>
                                    <div>Email Address</div>
                                    <div class="help-block email-verification">We've sent a verification email to {this.state.email}</div>
                                </div> */}
                                <div class="section-with-border margin-bottom">
                                    <a href="#" class="btn btn-default btn-block" id="viewProfileButton">View profile</a>
                                </div>
                                <div class="section-with-border cartoon-background-bottom js-unveil" data-bkg="//csvcus.homeaway.com/rsrcs/AC/033319FA5490A0191BFC1E46D6519B-house.png" /* style="background-image: url(&quot;//csvcus.homeaway.com/rsrcs/AC/033319FA5490A0191BFC1E46D6519B-house.png&quot;);" */>
                                    <div class="text-center">
                                        <h1 class="glyphicon glyphicon-user"></h1>
                                        <h3 class="section-header">Helpful tips</h3>
                                    </div>
                                    <dl class="profile-tips">
                                        <dt><h5 class="glyphicon glyphicon-menu-right"></h5>Add a photo of yourself</dt>
                                        <dt><h5 class="glyphicon glyphicon-menu-right"></h5>Verify your identity</dt>
                                        <dt><h5 class="glyphicon glyphicon-menu-right"></h5>Describe your interests and hobbies</dt>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Profile;
