import React, { Component } from "react";
import Data from "../../Data";

export const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = { loggedInuser: null };

  }

  render() {
    const { loggedInuser } = this.state;

    const value = {
      loggedInuser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  // Sign in action
  signIn = async (emailAddress, password) => {
    const user = await this.data.signInUser(emailAddress, password);
    if (user) {
      user.password = password;
      this.setState({loggedInuser : user});
    }
    else {
      return null;
    }
  };

  // Sign out action
  signOut = () => {
    this.setState({ loggedInuser: null });
  };
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}