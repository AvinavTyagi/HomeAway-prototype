import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../listing.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';

//create the Traveller Login Component
class PropertyListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            selectedFile: '',
            country: '',
            street: '',
            apartment: '',
            city: '',
            state: '',
            zipcode: '',
            headline: '',
            desc: '',
            type: 'Select Type',
            bedroom: '0',
            bathroom: '0',
            options: '',
            photo: '',
            currency: '',
            base: '',
            stay: '',
            listed: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.streetChangeHandler = this.streetChangeHandler.bind(this);
        this.apartmentChangeHandler = this.apartmentChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
        this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
        this.descChangeHandler = this.descChangeHandler.bind(this);
        this.typeChangeHandler = this.typeChangeHandler.bind(this);
        this.bedroomChangeHandler = this.bedroomChangeHandler.bind(this);
        this.bathroomChangeHandler = this.bathroomChangeHandler.bind(this);
        this.optionsChangeHandler = this.optionsChangeHandler.bind(this);
        this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
        this.baseChangeHandler = this.baseChangeHandler.bind(this);
        this.stayChangeHandler = this.stayChangeHandler.bind(this);
    }
    componentDidMount() {
        this.setState({
            listed: false
        })
    }
    countryChangeHandler = (e) => {
        this.setState({
            country: e.target.value
        })
    }
    streetChangeHandler = (e) => {
        this.setState({
            street: e.target.value
        })
    }
    apartmentChangeHandler = (e) => {
        this.setState({
            apartment: e.target.value
        })
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }
    headlineChangeHandler = (e) => {
        this.setState({
            headline: e.target.value
        })
    }
    descChangeHandler = (e) => {
        this.setState({
            desc: e.target.value
        })
    }
    typeChangeHandler = (e) => {
        this.setState({
            type: e
        })
    }
    bedroomChangeHandler = (e) => {
        this.setState({
            bedroom: e
        })
    }
    bathroomChangeHandler = (e) => {
        this.setState({
            bathroom: e
        })
    }
    optionsChangeHandler = (e) => {
        this.setState({
            options: e
        })
    }
    currencyChangeHandler = (e) => {
        this.setState({
            currency: e
        })
    }
    baseChangeHandler = (e) => {
        this.setState({
            base: e.target.value
        })
    }
    stayChangeHandler = (e) => {
        this.setState({
            stay: e.target.value
        })
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    onChange = (e) => {
        if (e.target.name == 'selectedFile') {
            this.setState({
                selectedFile: e.target.files[0]
            })
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    submitHandler = (e) => {
        let owner = '';
        e.preventDefault();
        owner = cookie.load('cookie');
        const data = {
            country: this.state.country,
            street: this.state.street,
            apartment: this.state.apartment,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            headline: this.state.headline,
            desc: this.state.desc,
            type: this.state.type,
            bedroom: this.state.bedroom,
            bathroom: this.state.bathroom,
            options: this.state.options,
            photo: this.state.photo,
            currency: this.state.currency,
            base: this.state.base,
            stay: this.state.stay,
            owner: owner
        }
        let formData = new FormData();

        // formData.append('description', description);
        // formData.append('selectedFile', selectedFile);

        axios.post('http://localhost:3001/addProperty', data)
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
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>{redirectVar}
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-8 col-xs-9 bhoechie-tab-container">
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 bhoechie-tab-menu">
                                <div class="list-group">
                                    <a href="#" class="list-group-item active text-center">
                                        <h4 class="glyphicon glyphicon-map-marker"></h4><br />Location
                </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h4 class="glyphicon glyphicon-list"></h4><br />Details
                </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h4 class="glyphicon glyphicon-list-alt"></h4><br />Booking Options
                </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h4 class="glyphicon glyphicon-picture"></h4><br />Photos
                </a>
                                    <a href="#" class="list-group-item text-center">
                                        <h4 class="glyphicon glyphicon-usd"></h4><br />Pricing
                </a>
                                </div>
                            </div>
                            <form class="" method="post" action="#">
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">

                                    <div class="bhoechie-tab-content active">
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Country </span>
                                                    <input type="text" onChange={this.countryChangeHandler.bind(this)} class="form-control" name="country" id="country" placeholder="Enter Country" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon">Street </span>
                                                    <input type="text" onChange={this.streetChangeHandler.bind(this)} class="form-control" name="street" id="street" placeholder="Enter Street Address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Apartment/Unit </span>
                                                    <input type="text" class="form-control" onChange={this.apartmentChangeHandler.bind(this)} name="unit" id="unit" placeholder="Enter Apartment/Suite/Unit number" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> City </span>
                                                    <input type="text" class="form-control" name="city" onChange={this.cityChangeHandler.bind(this)} id="city" placeholder="Enter City" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> State </span>
                                                    <input type="text" class="form-control" name="state" id="state" onChange={this.stateChangeHandler.bind(this)} placeholder="Enter State" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> ZipCode</span>
                                                    <input type="text" class="form-control" name="zip" id="zip" onChange={this.zipcodeChangeHandler.bind(this)} placeholder="Enter ZIP code" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Headline</span>
                                                    <input type="text" class="form-control" name="headline" id="headline" onChange={this.headlineChangeHandler.bind(this)} placeholder="Enter a summary of your property" />

                                                </div>
                                            </div>
                                            <br />
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Description</span>
                                                    <textarea class="form-control" name="description" id="description" onChange={this.descChangeHandler.bind(this)} placeholder="Enter a description for your property" />
                                                </div>
                                            </div>
                                            <br />
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Property Type</span><br />
                                                    <DropdownButton title={this.state.type} onSelect={this.typeChangeHandler.bind(this)}>
                                                        <MenuItem eventKey="Hotel">Hotel</MenuItem>
                                                        <MenuItem eventKey="BNB">BnB</MenuItem>
                                                        <MenuItem eventKey="Motel">Motel</MenuItem>
                                                        <MenuItem eventKey="Cottage">Cottage</MenuItem>
                                                        <MenuItem eventKey="Villa">Villa</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Bedrooms</span><br />
                                                    <DropdownButton title={this.state.bedroom} onSelect={this.bedroomChangeHandler.bind(this)}>
                                                        <MenuItem eventKey="0">0</MenuItem>
                                                        <MenuItem eventKey="1">1</MenuItem>
                                                        <MenuItem eventKey="2">2</MenuItem>
                                                        <MenuItem eventKey="3">3</MenuItem>
                                                        <MenuItem eventKey="4">4</MenuItem>
                                                        <MenuItem eventKey="5">5</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Bathrooms</span><br />
                                                    <DropdownButton title={this.state.bathroom} onSelect={this.bathroomChangeHandler.bind(this)}>
                                                        <MenuItem eventKey="0">0</MenuItem>
                                                        <MenuItem eventKey="1">1</MenuItem>
                                                        <MenuItem eventKey="2">2</MenuItem>
                                                        <MenuItem eventKey="3">3</MenuItem>
                                                        <MenuItem eventKey="4">4</MenuItem>
                                                        <MenuItem eventKey="5">5</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Booking Options</span><br />
                                                    <DropdownButton title={this.state.options} onSelect={this.optionsChangeHandler.bind(this)}>
                                                        <MenuItem eventKey="Instant Booking">Instant Booking</MenuItem>
                                                        <MenuItem eventKey="24 Hour Confirmation">24 Hour Confirmation</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Booking Options</span><br />
                                                    <input class="form-control"
                                                        type="file"
                                                        name="selectedFile"
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Currency </span><br />
                                                    <DropdownButton title={this.state.currency} onSelect={this.currencyChangeHandler.bind(this)}>
                                                        <MenuItem eventKey="USD">USD</MenuItem>
                                                        <MenuItem eventKey="CAD">CAD</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Nightly Base Rate</span><br />
                                                    <input type="text" class="form-control" name="base" onChange={this.baseChangeHandler.bind(this)} id="base" placeholder="Rental Base Rate" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Minimum Stay</span><br />
                                                    <input type="text" class="form-control" name="stay" id="stay" onChange={this.stayChangeHandler.bind(this)} placeholder="Minimum Stay" />
                                                </div>
                                            </div>
                                            <br /><br />
                                            <div class="form-group">
                                                <div class="cols-sm-10">
                                                    <div class="input-group" id="submit">
                                                        <input type="submit" class="btnSubmit" value="Submit" onClick={this.submitHandler.bind(this)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default PropertyListing;
