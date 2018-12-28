import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import React, { Component } from 'react';
import '../../App.css';
import renderDatePicker from '../Utils/datePicker';
import Autocomplete from 'react-google-autocomplete';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { logoutUser , ownerLoginAction } from '../../actions/authActions';
import { searchProperties } from '../../actions/propertyActions';
import { actionCreators } from "../../actions/authActions";
import { Field, reduxForm } from "redux-form";
import { withRouter } from 'react-router-dom';

//create the Navbar Component
class NavComp extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        //this.props.clearCurrentProfile(); After implementing profile
    }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""} `;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input type={field.type} className="form-control" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    onSubmit(values) {
        console.log(values);
        this.props.searchProperties(values,this.props.history);
    }
    render() {
        const { isAuthenticated, user, searchLocation } = this.props.auth;
        const {location} = this.props;
        const { handleSubmit } = this.props;
        let navProfile = null;
        if (isAuthenticated) {
            navProfile = (
                <div class="col-md-2" id="basic-nav-dropdown">
                    <NavDropdown eventKey={3} title={user.firstName}>
                        <MenuItem eventKey={3.1} href="/profile">Profile</MenuItem>
                        <MenuItem eventKey={3.2} href="/loadUserBookings">Dashboard</MenuItem>
                        <MenuItem onClick={this.onLogoutClick.bind(this)} eventKey={3.3}>Log Out</MenuItem>
                    </NavDropdown>
                </div>
            );
        } else {
            navProfile = (
                <div class="col-md-2" id="basic-nav-dropdown">
                    <NavDropdown eventKey={3} title="Login" >
                        <MenuItem eventKey={3.1} href="/travellerLogin">Traveller Login</MenuItem>
                        <MenuItem eventKey={3.2} href="/ownerLogin">Owner Login</MenuItem>
                    </NavDropdown>
                </div>
            )
        }
        let redirectVar = null;
        let navLogin = null;
        if (location.pathname ==="/") {
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
                                                        <form class="js-searchForm" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                                            {/* <form class="js-searchForm" method="post"> */}
                                                            <div class="row" id="searchboxRow">
                                                                <div class="col-md-4">
                                                                    <div class="searchbox-input searchbox-input-where-to form-group has-icon">
                                                                        {/* onChange={e => actionCreators.updateFirstName(e.target.value)} */}
                                                                        <Autocomplete class="form-control js-destination js-launchModal" name="searchLocation"
                                                                            onPlaceSelected={(place) => {
                                                                                actionCreators.updateSearchLocation(place.formatted_address);
                                                                            }}
                                                                            types={['(regions)']}
                                                                            componentRestrictions={{}}
                                                                        />
                                                                        <Field
                                                                            name="location"
                                                                            type="hidden"
                                                                            value={searchLocation}
                                                                            component={this.renderField}
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
                                                                    <Field
                                                                        name="startDate"
                                                                        //selected={moment(this.state.endDate)}
                                                                        //onChange={this.endDateChangeHandler}
                                                                        placeholder="Select Start"
                                                                        component={renderDatePicker}
                                                                    />
                                                                </div>
                                                                <div class="col-md-2">
                                                                    <Field
                                                                        name="endDate"
                                                                        placeholder="Select End"
                                                                        //selected={moment(this.state.endDate)}
                                                                       // onChange={this.endDateChangeHandler}
                                                                        component={renderDatePicker}
                                                                    />
                                                                    {/* <DatePicker placeholder="Arrive" class="form-control js-startDate" name = "endDate"
                                                                        selected={moment(this.state.endDate)}
                                                                        onChange={this.endDateChangeHandler}
                                                                    /> */}
                                                                </div>
                                                                <div class="col-md-2">
                                                                    {/* <select name="guests" class="form-control js-guestSelectorInput" value={this.state.guests} onChange={this.guestsChangeHandler}>
                                                                        <option value="0">Select Guests</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </select> */}
                                                                    <Field name="guests" component="select" class="form-control js-guestSelectorInput">
                                                                    <option ></option>
                                                                    <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </Field>
                                                                </div>
                                                                <div class="col-md-2">
                                                                    {/* <div class="form-group">
                                                                        <input type="submit" class="btnSubmit" value="Login" />
                                                                    </div> */}
                                                                    <button class="btn btn-primary btn searchbox-submit js-searchSubmit"
                                                                        data-effect="ripple" type="submit" tabindex="5" onClick={this.handleClick}>
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
const mapStateToProps = state => ({
    auth: state.auth
});
export default reduxForm({
    form: "searchForm"
})(connect(mapStateToProps, { searchProperties, logoutUser, ownerLoginAction })(withRouter(NavComp)));
//export default NavBar;