import React, { Component } from 'react';
import '../../propertyDetails.css';
import '../../search.css';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from 'react-router-dom';
import { loadProperty } from "../../actions/propertyActions";
import { addBooking } from "../../actions/propertyActions";

class PropertyDetail extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        // const className = `form-group ${touched && error ? "is-invalid" : ""} `;
        const className = `row form-group`;

        return (
            <div>
                <p>{field.label}</p>
                <input type={field.type} placeholder={field.placeholder} className={field.inputClass} id={field.id} {...field.input} />
                <div className="help-block">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    componentDidMount() {
        const location = this.props.location.pathname;
        console.log(location);
        this.props.loadProperty(location);
    }

    onSubmit = (values) => {
        values.id = this.props.location.pathname;
        this.props.addBooking(values, this.props.history);
        // axios.post('http://localhost:3001/addBooking', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.data);
        //         if (response.status === 200) {
        //             this.setState({
        //                 booked: true
        //             })
        //         } else if (response.status === 400) {
        //             this.setState({
        //                 booked: false
        //             })
        //         }
        //     });


    }

    render() {
        let p = this.props.property != null ? this.props.property : { _id: "", headline: "" };
        const { handleSubmit } = this.props;
        return (
            <div>
                <div class="container">

                    <hgroup class="mb20">
                        <h1>Property</h1>
                    </hgroup>
                    <div class="container">
                        <div class="card">
                            <div class="container-fliud">
                                <div class="wrapper row">
                                    <div class="preview col-md-6">
                                        <div class="preview-pic tab-content">
                                            <div class="tab-pane active" id="pic-1"><img src="http://placekitten.com/400/252" /></div>
                                            <div class="tab-pane" id="pic-2"><img src="http://placekitten.com/400/252" /></div>
                                            <div class="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
                                            <div class="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
                                            <div class="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div>
                                        </div>
                                        <ul class="preview-thumbnail nav nav-tabs">
                                            <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                            <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                            <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                            <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                            <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                                        </ul>

                                    </div>
                                    <div class="details col-md-6">
                                        <h3 class="product-title">{p.headline}</h3>
                                        <p class="product-description">{p.description}</p>
                                        <p ><span><i class="glyphicon glyphicon-bed"></i>{p.bedroom}BR {p.type}</span></p>
                                        <p ><span><i class="glyphicon glyphicon-tint"></i>{p.bathroom}Bath </span></p>

                                        <p><span><i class="glyphicon glyphicon-flash"></i>{p.currency}{p.base} per night!  </span> <span></span></p>

                                        <p><span><i class="glyphicon glyphicon-map-marker"></i>{p.street}  </span> <span></span></p>

                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} class="js-profile-form">
                                            <div class="row form-group ">

                                                <Field
                                                    label="From Date :"
                                                    name="fromDate"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="fromDateInput"
                                                    placeholder="MM/DD/YYYY"
                                                    component={this.renderField}
                                                />
                                                <div>
                                                    <br />
                                                    <Field
                                                        label="To Date :"
                                                        name="toDate"
                                                        type="text"
                                                        divClass="col-sm-12 col-md-7"
                                                        inputClass="form-control input-lg js-input-field"
                                                        id="toDateInput"
                                                        placeholder="MM/DD/YYYY"
                                                        component={this.renderField}
                                                    />
                                                </div>
                                                <div class="action">
                                                    <button class="add-to-cart btn btn-default pull-right" type="submit">Book Now</button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    property: state.property,
    errors: state.errors
});
//          
PropertyDetail = reduxForm({
    form: 'propertyDetails',
    enableReinitialize: true  // a unique identifier for this form
})(PropertyDetail)

// You have to connect() to any reducers that you wish to connect to yourself
PropertyDetail = connect(
    state => ({
        property: state.property.property
        // pull initial values from account reducer
    }),
    { loadProperty, addBooking }
    ///,mapStateToProps          // bind account loading action creator
)(PropertyDetail)

export default PropertyDetail