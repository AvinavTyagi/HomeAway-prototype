import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loadProfile} from "../../actions/profileActions";
import { updateProfile } from "../../actions/profileActions";

//create the Traveller Login Component
class Profile extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        // const className = `form-group ${touched && error ? "is-invalid" : ""} `;
        const className = `row form-group`;

        return (
            <div className={className}>
                <label className={field.labelClass} htmlFor={field.labelFor}>{field.label}</label>
                <div className={field.divClass}>
                    <input type={field.type} placeholder={field.placeholder} className={field.inputClass} id={field.id} {...field.input} /></div>
                <div className="help-block">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    renderHeading(field) {
        const { meta: { touched, error } } = field;

        return (
            <div>
                <h2 class="user-name" name={field.name}></h2>
            </div>
        );
    }
    renderTextArea = ({ input, meta: { touched, error, warning } }) => (
        <div>
            <label>About me</label>
            <div>
                <textarea {...input} placeholder="About me" rows="4" cols="40"></textarea>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );

    componentDidMount() {
        this.props.loadProfile();
    }
    onSubmit(values) {
        console.log(values);
        this.props.updateProfile(values, this.props.history);
    }
    render() {
        const { handleSubmit } = this.props;
        const firstName = this.props.initialValues != null ? this.props.initialValues.firstName : '';
        const lastName = this.props.initialValues != null ? this.props.initialValues.lastName : '';
        return (
            <div>
                <section class="container">
                    <div class="row tab-content">
                        <div id="profileInfo" role="tabpanel">
                            <header class="text-center">
                                <div>
                                    <h2 class="user-name">{firstName} {lastName}</h2>
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
                                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                                <Field
                                                    label="First name"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="firstName"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileFirstNameInput"
                                                    labelFor="profileFirstNameInput"
                                                    placeholder="First name"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Last name or initial"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="lastName"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileLastNameInput"
                                                    labelFor="profileFirstNameInput"
                                                    placeholder="Last name or initial"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="About me"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="about"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileAboutInput"
                                                    labelFor="profileAboutInput"
                                                    placeholder="About me"
                                                    textarea={true}
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Current City"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="address"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileCityInput"
                                                    labelFor="profileCityInput"
                                                    placeholder="Current City"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Company"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="company"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileCompanyInput"
                                                    labelFor="profileCompanyInput"
                                                    placeholder="Company"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="School"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="school"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileSchoolInput"
                                                    labelFor="profileSchoolInput"
                                                    placeholder="School"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Hometown"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="hometown"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileHometownInput"
                                                    labelFor="profileHometownInput"
                                                    placeholder="Hometown"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Languages"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="languages"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileLanguageInput"
                                                    labelFor="profileLanguageInput"
                                                    placeholder="Languages"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Gender"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="gender"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profileGenderInput"
                                                    labelFor="profileGenderInput"
                                                    placeholder="Gender"
                                                    component={this.renderField}
                                                />
                                                <Field
                                                    label="Phone number"
                                                    labelClass="col-xs-12 sr-only"
                                                    name="phone"
                                                    type="text"
                                                    divClass="col-sm-12 col-md-7"
                                                    inputClass="form-control input-lg js-input-field"
                                                    id="profilePhoneInput"
                                                    labelFor="profilePhoneInput"
                                                    placeholder="Phone number"
                                                    component={this.renderField}
                                                />
                                                <div class="profile-form-footer">
                                            <button type="submit" class="btn btn-primary hidden-xs js-submit-profile" data-loading-text="Sending...">Save changes</button>
                                        </div>
                                            </form>
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
const mapStateToProps = state => ({
    //profile: state.profile.profile,
    errors: state.errors
});
Profile = reduxForm({
    form: 'initializeFromState',
    enableReinitialize: true  // a unique identifier for this form
})(Profile)

// You have to connect() to any reducers that you wish to connect to yourself
Profile = connect(
    state => ({
        initialValues: state.profile.profile
        // pull initial values from account reducer
    }),
    { loadProfile, updateProfile }
    ///,mapStateToProps          // bind account loading action creator
)(Profile)

export default Profile
