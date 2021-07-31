import React from "react";

import FormInput from "components/Form/FormInput";
import Button from "components/Button";
import { connect } from "react-redux";

import { signInUser } from "actions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  submitSignInForm = async event => {
    event.preventDefault();
    try {
      const user = {...this.state};
      const isSignedIn = await this.props.signInUser(user);
      if(isSignedIn){
        this.props.signInCallback();
      }
    } catch (error) {
      console.log("Something went wrong while signing user", error.message);
    }
  };

  render() {
    return (
      <div className="login-container">
        <h2 style={{display:`${this.props.hideHeader?'none':'block'}`}}>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.submitSignInForm}>
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
          <div className="login-buttons">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStatetoProps = ({auth}) =>{
  return{
    signUpErrors: auth.signInErrors,
    isSignedIn: auth.isSignedIn
  }
}

export default connect(mapStatetoProps, { signInUser })(Login)