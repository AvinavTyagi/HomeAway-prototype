import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { ownerLoginAction } from "../../actions/authActions";
import '../../login.css';

class TravellerLogin extends Component {

  //Define component that you want to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "is-invalid" : ""} `;
    //const className = `form-group`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input type={field.type} className="form-control has-danger" {...field.input} />
        <div className="help-block">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  /*Action call
  Whenever onSubmit event is triggered, execute an action call called ownerLogin 
  */
  onSubmit(values) {
    //console.log(values);
    this.props.ownerLoginAction(values,this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (

      //handleSubmit is the method that comes from redux and it tells redux what to do with the submitted form data
      //Field is a component of redux that does the wiring of inputs to the redux store.
      <div class="container login-container">
        <div class="row login-form">
          <div class="col-md-6 image">
            <img alt="HomeAway logo" class="site-header-logo__img img-responsive"
              role="presentation" src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png">
            </img>
          </div>
          <div class="col-md-6">
            <h3>Traveler Login</h3>
            <div class="col-md-6">
              <h4>&nbsp;Need an account? </h4>
            </div>
            <div class="col-md-6" >
              <h4 class="ForgetPwd"><a href="/travellerRegistration" class="ForgetPwd" value="Login">Sign Up</a></h4>
            </div>
            <hr />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

              <Field
                label="Email"
                name="email"
                type="text"
                component={this.renderField}
              />

              <Field
                label="Password"
                name="password"
                type="password"
                component={this.renderField}
              />
              <div class="form-group">
                <input type="submit" class="btnSubmit" value="Login" />
              </div>
              {/* <button type="submit" className="btn btn-primary">Submit</button>
              <Link to="/" className="btn btn-danger">Cancel</Link> */}
            </form>
          </div>
        </div>
      </div>
    );
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

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(ownerLoginAction, dispatch) }
// }
// export default reduxForm({
//   validate,
//   //   form: "NewBookForm"
//   form: "loginForm"
// })(connect(mapStateToProps, mapDispatchToProps)(withRouter(OwnerLogin)));
export default reduxForm({
  validate,
  form: "loginForm"
})(connect(mapStateToProps, {ownerLoginAction})(withRouter(TravellerLogin)));
