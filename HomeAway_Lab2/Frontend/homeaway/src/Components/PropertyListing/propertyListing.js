import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../listing.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createProperty } from "../../actions/propertyActions";
import { withRouter } from 'react-router-dom';

//create the Traveller Login Component
class PropertyListing extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        // const className = `form-group ${touched && error ? "is-invalid" : ""} `;
        const className = `form-group`;

        return (
            <div className={className}>
                <div class="cols-sm-10">
                    <div class="input-group">
                        <span className={field.spanClass}> {field.span} </span>
                        <input type={field.type} placeholder={field.placeholder} className={field.inputClass} id={field.id} name={field.name} {...field.input} />

                        <div className="help-block">
                            {touched ? error : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
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

    onSubmit = (values) => {
        console.log(values);
        this.props.createProperty(values, this.props.history);
        // let owner = '';
        // e.preventDefault();
        // owner = cookie.load('cookie');
        // const data = {
        // }
        // let formData = new FormData();

        // // formData.append('description', description);
        // // formData.append('selectedFile', selectedFile);

        // axios.post('http://localhost:3001/addProperty', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.status);
        //         if (response.status === 200) {
        //             this.setState({
        //                 listed: true
        //             })
        //         } else if (response.status === 400) {
        //             this.setState({
        //                 listed: false
        //             })
        //         }
        //     });

    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
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
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">

                                    <div class="bhoechie-tab-content active">
                                        {/* <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Country </span>
                                                    <input type="text" onChange={this.countryChangeHandler.bind(this)} class="form-control" name="country" id="country" placeholder="Enter Country" />
                                                </div>
                                            </div>
                                        </div> */}
                                        <Field
                                            span="Country"
                                            spanClass="input-group-addon"
                                            name="country"
                                            type="text"
                                            inputClass="form-control"
                                            id="country"
                                            placeholder="Enter Country"
                                            component={this.renderField}
                                        />
                                        <Field
                                            span="Street"
                                            spanClass="input-group-addon"
                                            name="street"
                                            type="text"
                                            inputClass="form-control"
                                            id="street"
                                            placeholder="Enter Street Address"
                                            component={this.renderField}
                                        />
                                        <Field
                                            span="Apartment/Unit"
                                            spanClass="input-group-addon"
                                            name="unit"
                                            type="text"
                                            inputClass="form-control"
                                            id="unit"
                                            placeholder="Enter Apartment/Suite/Unit number"
                                            component={this.renderField}
                                        />
                                        <Field
                                            span="City"
                                            spanClass="input-group-addon"
                                            name="city"
                                            type="text"
                                            inputClass="form-control"
                                            id="city"
                                            placeholder="Enter city"
                                            component={this.renderField}
                                        />
                                        <Field
                                            span="State"
                                            spanClass="input-group-addon"
                                            name="state"
                                            type="text"
                                            inputClass="form-control"
                                            id="state"
                                            placeholder="Enter state"
                                            component={this.renderField}
                                        />
                                        <Field
                                            span="ZipCode"
                                            spanClass="input-group-addon"
                                            name="zipcode"
                                            type="text"
                                            inputClass="form-control"
                                            id="zipcode"
                                            placeholder="Enter ZIP code"
                                            component={this.renderField}
                                        />
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        <Field
                                            span="Headline"
                                            spanClass="input-group-addon"
                                            name="headline"
                                            type="text"
                                            inputClass="form-control"
                                            id="headline"
                                            placeholder="Enter headline"
                                            component={this.renderField}
                                        />
                                        <br />
                                        <Field
                                            span="Description"
                                            spanClass="input-group-addon"
                                            name="desc"
                                            type="text"
                                            inputClass="form-control"
                                            id="desc"
                                            placeholder="Enter description"
                                            component={this.renderField}
                                        />
                                        <br />
                                        <div class="cols-sm-10">
                                            <div class="input-group">
                                                <span class="input-group-addon"> Property Type</span><br />
                                                <div class= "dropdown btn-group">
                                                    <Field name="type" class ="dropdown-toggle btn btn-default" component="select">
                                                        <option></option>
                                                        <option value="Hotel">Hotel</option>
                                                        <option value="BNB">BNB</option>
                                                        <option value="Motel">Motel</option>
                                                        <option value="Cottage">Cottage</option>
                                                        <option value="Villa">Villa</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="cols-sm-10">
                                            <div class="input-group">
                                                <span class="input-group-addon"> Property Type</span><br />
                                                <DropdownButton 
                                                // title={this.state.type} onSelect={this.typeChangeHandler.bind(this)}
                                                >
                                                    <MenuItem eventKey="Hotel">Hotel</MenuItem>
                                                    <MenuItem eventKey="BNB">BnB</MenuItem>
                                                    <MenuItem eventKey="Motel">Motel</MenuItem>
                                                    <MenuItem eventKey="Cottage">Cottage</MenuItem>
                                                    <MenuItem eventKey="Villa">Villa</MenuItem>
                                                </DropdownButton>
                                            </div>
                                        </div> */}
                                        <br />
                                        {/* <div class="cols-sm-10">
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
                                            </div> */}
                                        <div class="cols-sm-10">
                                            <div class="input-group">
                                                <span class="input-group-addon"> Bedrooms</span><br />
                                                <div class= "dropdown btn-group">
                                                    <Field name="bedroom" class ="dropdown-toggle btn btn-default" component="select">
                                                        <option></option>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        {/* <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Bathrooms</span><br />
                                                    <DropdownButton 
                                                    //title={this.state.bathroom} onSelect={this.bathroomChangeHandler.bind(this)}
                                                    >
                                                        <MenuItem eventKey="0">0</MenuItem>
                                                        <MenuItem eventKey="1">1</MenuItem>
                                                        <MenuItem eventKey="2">2</MenuItem>
                                                        <MenuItem eventKey="3">3</MenuItem>
                                                        <MenuItem eventKey="4">4</MenuItem>
                                                        <MenuItem eventKey="5">5</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="cols-sm-10">
                                            <div class="input-group">
                                                <span class="input-group-addon"> Bathrooms</span><br />
                                                <div class= "dropdown btn-group">
                                                    <Field name="bathroom" class ="dropdown-toggle btn btn-default" component="select">
                                                        <option></option>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        <div class="form-group">
                                            {/* <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Booking Options</span><br />
                                                    <DropdownButton 
                                                    //title={this.state.options} onSelect={this.optionsChangeHandler.bind(this)}
                                                    >
                                                        <MenuItem eventKey="Instant Booking">Instant Booking</MenuItem>
                                                        <MenuItem eventKey="24 Hour Confirmation">24 Hour Confirmation</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div> */}
                                            <div class="cols-sm-10">
                                            <div class="input-group">
                                                <span class="input-group-addon"> Booking Options</span><br />
                                                <div class= "dropdown btn-group">
                                                    <Field name="options" class ="dropdown-toggle btn btn-default" component="select">
                                                        <option></option>
                                                        <option value="Instant Booking">Instant Booking</option>
                                                        <option value="24 Hour Confirmation">24 Hour Confirmation</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                        {/* <Field
                                            span="Photos"
                                            spanClass="input-group-addon"
                                            name="selectedFile"
                                            type="file"
                                            inputClass="form-control"
                                            // onChange={this.onChange}
                                            component={this.renderField}
                                        /> */}
                                        {/* <div class="form-group">
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
                                        </div> */}
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 bhoechie-tab">
                                    <div class="bhoechie-tab-content">
                                         {/*<div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group">
                                                    <span class="input-group-addon"> Currency </span><br />
                                                    <DropdownButton 
                                                    //title={this.state.currency} onSelect={this.currencyChangeHandler.bind(this)}
                                                    >
                                                        <MenuItem eventKey="USD">USD</MenuItem>
                                                        <MenuItem eventKey="CAD">CAD</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div class="cols-sm-10">
                                            <div class="input-group">
                                                <span class="input-group-addon"> Currency</span><br />
                                                <div class= "dropdown btn-group">
                                                    <Field name="currency" class ="dropdown-toggle btn btn-default" component="select">
                                                        <option></option>
                                                        <option value="USD">USD</option>
                                                        <option value="CAD">CAD</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <Field
                                            span="Nightly Base Rate"
                                            spanClass="input-group-addon"
                                            name="base"
                                            type="text"
                                            inputClass="form-control"
                                            id="base"
                                            placeholder="Enter Base Rate"
                                            component={this.renderField}
                                        />
                                        <Field
                                            span="Minimum Stay"
                                            spanClass="input-group-addon"
                                            name="stay"
                                            type="text"
                                            inputClass="form-control"
                                            id="stay"
                                            placeholder="Minimum Stay"
                                            component={this.renderField}
                                        />
                                        <br /><br />
                                        <div class="form-group">
                                            <div class="cols-sm-10">
                                                <div class="input-group" id="submit">
                                                    <input type="submit" class="btnSubmit" value="Submit" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
const mapStateToProps = state => ({
    property: state.property,
    errors: state.errors
});
export default reduxForm({
    //validate,
    //   form: "NewBookForm"
    form: "propertyForm"
})(connect(mapStateToProps, { createProperty })(withRouter(PropertyListing)));
