import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">Courses</h1>
          <nav>
            <ul className="header--signedout">
              {authUser ? (
                <React.Fragment>
                  <span>Welcome, {authUser.name}!</span>
                  <li>
                    <Link to="/signout">Sign Out</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                  <Link className="signup" to="/signup">
                    Sign Up
                  </Link>
                  </li>
                  <li className='header--signedin'>
                  <Link className="signin" to="/signin">
                    Sign In
                  </Link></li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
