import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Provider from "./components/Context";
import "./App.css";
// import Authenticated from './components/Authenticated';
// import UserSignIn from './components/Users/UserSignIn';
import Header from './/components/Header';
import UserSignUp from './components/Users/UserSignUp';
// import UserSignOut from './components/Users/UserSignOut';
import Public from "./components/Public";
// import NotFound from './components/NotFound';

// import PrivateRoute from "./components/PrivateRoute";

import withContext from "./components/Context";

//const AuthWithContext = withContext(Authenticated);
//const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const HeaderWithContext = withContext(Header);
//const UserSignOutWithContext = withContext(UserSignOut);

// import Courses from "./components/Courses/Courses";

//use as main container
function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" element={Public} />
          {/* <PrivateRoute path="/authenticated" element={AuthWithContext} />
          <Route path="/signin" element={UserSignInWithContext} /> */}
          <Route path="/signup" element={UserSignUpWithContext} />
          {/* <Route path="/signout" element={UserSignOutWithContext} />
          <Route element={NotFound} /> */}
        </Switch>
      </div>{" "}
    </Router>
  );
}

export default App;
