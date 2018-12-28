import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import '../../login.css';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from '../../actions/authActions';

//create the Traveller Login Component
class TravellerRegistration extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""} `;
        //const className = 'form-group';

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input type={field.type} className="form-control is-invalid " {...field.input} class={field.class} value={field.value} />
                <div className="help-block">
                    {touched ? error : ""}
                </div>
            </div>
        )
    }


    //submit Login handler to send a request to the node backend
    onSubmit = (values) => {
        console.log(values);
        this.props.registerUser(values, this.props.history);

    }
    render() {
        const { handleSubmit } = this.props;
        const { errors } = this.props.errors != undefined ? this.props.errors : {email:''};
        return (
            <div>
                <div class="container login-container">
                    <div class="row login-form">
                        <div class="col-md-6 image">
                            <img alt="HomeAway logo" class="site-header-logo__img img-responsive"
                                role="presentation" src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png">
                            </img>
                        </div>
                        <div class="col-md-6">
                            <h3>Traveller Registration</h3>
                            <hr />
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <Field
                                    label="Email"
                                    name="email"
                                    type="text"
                                    component={this.renderField}
                                />
                                {/* {errors.email && (
                                    <div className="help-block">{errors.email}</div>
                                )} */}
                                <Field
                                    label="First Name"
                                    name="firstname"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Last Name"
                                    name="lastname"
                                    type="text"
                                    component={this.renderField}
                                />

                                <Field
                                    label="Password"
                                    name="password"
                                    type="password"
                                    component={this.renderField}
                                />
                                <Field
                                    name="register"
                                    type="submit"
                                    class="btnSubmit"
                                    component={this.renderField}
                                    value="Register"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.email) {
        errors.email = "Enter an email";
    }
    if (!values.password) {
        errors.password = "Enter password";
    }
    if (!values.firstname) {
        errors.firstname = "Enter first name";
    }
    if (!values.lastname) {
        errors.lastname = "Enter lastname";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default reduxForm({
    validate,
    //   form: "NewBookForm"
    form: "registrationForm"
})(connect(mapStateToProps, { registerUser })(withRouter(TravellerRegistration)));