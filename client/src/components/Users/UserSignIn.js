import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../Form";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  // Handling the change in the email address and password state variables
  change = (e) => {
    const value = e.target.value;
    if (e.target.name === "emailAddress") {
      this.setState({ emailAddress: value });
    } else if (e.target.name === "password") {
      this.setState({ password: value });
    }
  };

  // To login the user
  submit = () => {
    if (this.state.emailAddress.length > 0 && this.state.password.length > 0) {
      const { context } = this.props;
      const { from } = this.props.location.state || {
        from: { pathname: "/" },
      };
      const { emailAddress, password } = this.state;

      context.actions
        .signIn(emailAddress, password)
        .then((user) => {
          if (user === null) {
            this.setState({ errors: ["Invalid credentials!!!"] });
          } else {
            this.props.history.push(from);
          }
        })
        .catch((error) => {
          console.error(error);
          this.props.history.push("/error");
        });
    } else {
      const error = [];
      if (this.state.emailAddress.length === 0) {
        error.push("Email address is a mandatory field");
      }
      if (this.state.password.length === 0) {
        error.push("Password is a mandatory field");
      }
      this.setState({ errors: error });
    }
  };

  // Loads back the course page
  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="form--centered">
        <h1>Sign In</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign In"
          elements={() => (
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={this.change}
                placeholder="Email Address"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.change}
                placeholder="Password"
              />
            </div>
          )}
        />
        <p>
          Don't have a user account? <Link to="/signup">Click here</Link> to
          sign up!
        </p>
      </div>
    );
  }
}
