import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ownerLoginAction } from "../../actions";
import '../../login.css';

class OwnerLogin extends Component {

  //Define component that you want to render
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  /*Action call
  Whenever onSubmit event is triggered, execute an action call called ownerLogin 
  */
  onSubmit(values) {
    console.log(values);
    this.props.ownerLoginAction(values, () => {
        console.log("Login Successful");
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (

      //handleSubmit is the method that comes from redux and it tells redux what to do with the submitted form data
      //Field is a component of redux that does the wiring of inputs to the redux store.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
        <Field
          label="Email"
          name="username"
          type = "text"
          component={this.renderField}
        />

        <Field
          label="Password"
          name="password"
          type = "password"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {

  const errors = {};

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = "Enter an email";
  }
  if (!values.password) {
    errors.password = "Enter password";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
//   form: "NewBookForm"
form: "loginForm"
})(connect(null, { ownerLoginAction })(OwnerLogin));
