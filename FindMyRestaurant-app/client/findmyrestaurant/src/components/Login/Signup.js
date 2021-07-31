import React from "react";

import FormInput from "components/Form/FormInput";
import Button from "components/Button";
import { connect } from "react-redux";

import { signUpUser } from "actions";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: this.getCurrentDate(),
      validationError: []
    };
  }
  getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleDateChange = date => {
    this.setState({ dateOfBirth: date });
  }
  submitSignUpForm = event => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        validationError: ["Passwords do not match"]
      });
      return;
    }
    try {
      //write code to mutate graphql
      const user = {...this.state};
      this.props.signUpUser(user);
    } catch (error) {
      console.log("Something went wrong while creating user", error.message);
    }
  };
  handleSignUp = event => { };

  render() {
    return (
      <div className="login-container">
        <h2>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.submitSignUpForm}>
          <div className="form-input-group">
            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              value={this.state.firstName}
              required
              handleChange={this.handleInputChange}
            />
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              value={this.state.lastName}
              required
              handleChange={this.handleInputChange}
            />
          </div>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={this.state.email}
            required
            handleChange={this.handleInputChange}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleInputChange}
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            handleChange={this.handleInputChange}
          />
          <FormInput
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={this.state.dateOfBirth}
            handleChange={this.handleInputChange}
          />
          <div className="form-errors">
            {
              this.props.signUpErrors.length || this.state.validationError.length ?
              [...this.props.signUpErrors, ...this.state.validationError].join(","):
              null
            }
          </div>
          <div className="login-buttons">
            <Button type="submit" onClick={this.handleSignUp}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStatetoProps = ({auth}) =>{
  return{
    signUpErrors: auth.signUpErrors,
    isSignedIn: auth.isSignedIn
  }
}

export default connect(mapStatetoProps, { signUpUser })(Signup)