import React from "react";

import FormInput from "components/Form/FormInput";
import Button from "components/Button";

import { auth, createUserProfileDocument } from "firebase/firebase.util";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  submitSignUpForm = async event => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, {displayName});
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.log("Something went wrong while creating user", error.message);
    }
  };
  handleSignUp = event => {};

  render() {
    return (
      <div className="login-container">
        <h2>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.submitSignUpForm}>
          <FormInput
            label="Display Name"
            name="displayName"
            type="text"
            value={this.state.displayName}
            required
            handleChange={this.handleInputChange}
          />
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
