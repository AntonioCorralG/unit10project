import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import UserSignIn from './components/Users/UserSignIn';
import Header from './/components/Header';
import UserSignUp from './components/Users/UserSignUp';
import UserSignOut from './components/Users/UserSignOut';

import InvalidPath from './components/InvalidPath';
import Courses from './components/Courses/Courses'
import CourseDetail from './components/Courses/CourseDetail';
import CreateCourse from './components/Courses/CreateCourse';
import UpdateCourse from './components/Courses/UpdateCourse';


import PrivateRoute from "./components/PrivateRoute";

import withContext from "./components/Context/Context";

const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail)
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


//use as main container
export default () => {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
          <Route path='/courses/:id/update' component= {UpdateCourseWithContext} />
          <PrivateRoute path='/courses/create' component={CreateCourseWithContext}/>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path='/courses/:id' component={CourseDetailWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="*" component={InvalidPath} />
        </Switch>
      </div>{" "}
    </Router>
  );
}