import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Autocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { graphql, compose } from 'react-apollo';
import { getPropertiesQuery } from '../../queries/queries';

//create the Navbar Component
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFlag: this.props.loginFlag,
            place: "",
            guests: "0",
            startDate: moment(),
            endDate: moment(),
            doSearch: false,
            results: [],
            logout: false
        }
        this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
        this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
        this.guestsChangeHandler = this.guestsChangeHandler.bind(this);
        this.placeChangeHandler = this.placeChangeHandler.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentWillMount() {
        this.setState({
            doSearch: false
        })
    }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        this.setState({
            logout: true
        });
    }
    startDateChangeHandler = (date) => {
        this.setState({
            startDate: date
        });
    }
    endDateChangeHandler = (date) => {
        this.setState({
            endDate: date
        });

    }
    guestsChangeHandler(e) {
        this.setState({ guests: e.target.value });
    }

    placeChangeHandler(val, e) {
        this.setState({ place: val });
    }
    // componentDidUpdate() {
    //     // Access ISO String and formatted values from the DOM.
    //     var hiddenInputElement = document.getElementById("example-datepicker");
    //     console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    //     console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    // }
    handleClick = e => {
        // const data = {
        //     place: this.state.place,
        //     start: this.state.startDate,
        //     end: this.state.endDate,
        //     guests: this.state.guests
        // } 
        console.log(this.props.getPropertiesQuery);
        this.setState({
            doSearch: true
        });
        this.props.history.push('/searchResults' + this.state.place)

    }
    render() {
        let navProfile = null;
        let user = cookie.load('cookie');
        if (user) {
            user = user.split(",")[0];
            navProfile = (
                <div class="col-md-2" id="basic-nav-dropdown">
                    <NavDropdown eventKey={3} title={user}>
                        <MenuItem eventKey={3.1} href="/profile">Profile</MenuItem>
                        <MenuItem eventKey={3.3} href="/loadUserBookings">Dashboard</MenuItem>
                        <MenuItem onClick={this.handleLogout} eventKey={3.2}>Log Out</MenuItem>
                    </NavDropdown>
                </div>
            );
        } else {
            navProfile = (
                <div class="col-md-2" id="basic-nav-dropdown">
                    <NavDropdown eventKey={3} title="Login" >
                        <MenuItem eventKey={3.1} href="/travelerLogin">Traveller Login</MenuItem>
                        <MenuItem eventKey={3.2} href="/ownerLogin">Owner Login</MenuItem>
                    </NavDropdown>
                </div>
            )
        }
        var place = "";
        let redirectVar = null;
        let cookieVar = false;
        // if (!user) {
        //     redirectVar = <Redirect to="/ownerLogin" />
        //     cookieVar = true;
        // }
        if (this.state.doSearch) {
            //console.log("NAVBAR RESULTS " + this.state.results);
            redirectVar = <Redirect to={{
                pathname: '/searchResults',
                state: { searchResults: this.state.results }
            }} />
        }
        let navLogin = this.state.loginFlag;
        if (!navLogin) {
            navLogin = (
                <div>{redirectVar}
                    <header role="banner">
                        <div class="HeroImage">

                            <div class="row" id="rownav">
                                <Navbar>

                                    <div class="col-md-3">
                                        <Navbar.Header>
                                            <div class="site-header-logo">
                                                <img alt="HomeAway logo" class="site-header-logo__img img-responsive"
                                                    role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg">
                                                </img>
                                            </div>
                                        </Navbar.Header>
                                    </div>

                                    <Nav>
                                        <div class="col-md-2" id="basic-nav-dropdown">
                                            <NavItem eventKey={2} href="#">
                                                Trip Boards
                                            </NavItem>
                                        </div>
                                        {navProfile}
                                        <div class="col-md-2">
                                            <NavItem eventKey={4} href="/propertyListing">

                                                <button type="button" class="btn btn-outline-primary btn-lg">List Your Property</button>
                                            </NavItem>
                                        </div>
                                    </Nav>


                                </Navbar>

                            </div>

                            <div>
                                <div class="HeroImage__content">
                                    <div class="header-placeholder"></div>
                                    <div class="Jumbotron">
                                        <div class="Jumbotron__wrapper">
                                            <div class="Jumbotron__content">
                                                <h1 class="HeadLine"><span class="HeadLine">Book beach houses, cabins,</span><br /><span
                                                    class="HeadLine">condos and more, worldwide</span></h1>
                                                <div id="stab-searchbox" class="mobile-inline">
                                                    <div class="stab-searchbox">
                                                        <form class="js-searchForm" method="post">
                                                            <div class="row" id="searchboxRow">
                                                                <div class="col-md-4">
                                                                    <div class="searchbox-input searchbox-input-where-to form-group has-icon">
                                                                        {/* <input type="text" id="searchKeywords" class="form-control js-destination js-launchModal"
                                                                name="term" tabindex="1" placeholder="Where do you want to go?" ref={this.input}>
                                                            </input> */}

                                                                        <Autocomplete class="form-control js-destination js-launchModal"
                                                                            onPlaceSelected={(place) => {
                                                                                this.placeChangeHandler(place.formatted_address);
                                                                            }}
                                                                            types={['(regions)']}
                                                                            componentRestrictions={{}}
                                                                        />
                                                                        <label class="sr-only" for="searchKeywords">Where do you want to go?</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <div class="visible-xs searchbox-xs-btn-affordance pull-left">
                                                                        <div class="btn btn-lg btn-primary js-launchModal">
                                                                            <i aria-hidden="true" class="icon-search"></i>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div class="searchbox-input searchbox-input-depart form-group has-icon">
                                                            <input type="text" id="stab-searchbox-end-date" class="form-control js-endDate"
                                                                name="to-date" tabindex="3" placeholder="Depart" readonly="true"></input>
                                                            <i class="icon-calendar form-control-icon" aria-hidden="true"></i>
                                                            <label class="sr-only" for="stab-searchbox-end-date">Depart</label>
                                                        </div> */}
                                                                    <DatePicker placeholder="Depart"
                                                                        selected={moment(this.state.startDate)}
                                                                        onChange={this.startDateChangeHandler}
                                                                    />
                                                                </div>
                                                                <div class="col-md-2">
                                                                    {/* <div class="searchbox-input searchbox-input-arrive form-group has-icon">
                                                            <input type="text" id="stab-searchbox-start-date" class="form-control js-startDate"
                                                                name="from-date" tabindex="2" placeholder="Arrive" readonly="true"></input>
                                                            <i class="icon-calendar form-control-icon" aria-hidden="true"></i>
                                                            <label class="sr-only" for="stab-searchbox-start-date">Arrive</label>
                                                        </div> */}
                                                                    <DatePicker placeholder="Arrive" class="form-control js-startDate"
                                                                        selected={moment(this.state.endDate)}
                                                                        onChange={this.endDateChangeHandler}
                                                                    />
                                                                </div>
                                                                <div class="col-md-2">
                                                                    {/* <div id="pets-search-warning">
                                                            <div id="stab-guest-selector" class="form-group searchbox-input searchbox-select icon-usergroup">
                                                                <input readonly="true" autocomplete="off" type="text" class="form-control js-guestSelectorInput"
                                                                    tabindex="4" placeholder="Guests"></input>
                                                            </div>
                                                        </div> */}
                                                                    <select class="form-control js-guestSelectorInput" value={this.state.guests} onChange={this.guestsChangeHandler}>
                                                                        <option value="0">Select Guests</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <button class="btn btn-primary btn searchbox-submit js-searchSubmit"
                                                                        data-effect="ripple" type="button" tabindex="5" onClick={this.handleClick}>
                                                                        Search
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ValueProps hidden-xs">
                                                <ul class="ValueProps__list">
                                                    <li class="ValueProps__item"><strong class="ValueProps__title">Your whole vacation
                                            starts here</strong><span class="ValueProps__blurb">Choose a rental from
                                            the world's best selection</span></li>
                                                    <li class="ValueProps__item"><strong class="ValueProps__title">Book and stay with
                                            confidence</strong><span class="ValueProps">Secure
                                                payments, peace of mind </span> </li> <li class="ValueProps__item"><strong
                                                        class="ValueProps__title">Your vacation your way</strong><span
                                                            class="ValueProps__blurb">More space, more privacy, no compromises</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </header >
                </div>
            );
        } else {
            navLogin = (
                <div>
                    {redirectVar}
                    <div class="row" id="rownavlogin">
                        <Navbar>

                            <div class="col-md-10">
                                <Navbar.Header>
                                    <div class="site-header-logo">
                                        <img alt="HomeAway logo" class="site-header-logo__img img-responsive"
                                            role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg">
                                        </img>
                                    </div>
                                </Navbar.Header>
                            </div>

                            <Nav>
                                <div class="col-md-2">
                                    <NavItem eventKey={2} href="#">
                                        Trip Boards
                        </NavItem>
                                </div>
                            </Nav>

                        </Navbar>
                    </div>

                </div>
            );
        }
        return (
            <div>
                {navLogin}
            </div>

        )
    }
}
export default compose(
    graphql(getPropertiesQuery, { name: "getPropertiesQuery" })
)(NavBar);
//export default NavBar;