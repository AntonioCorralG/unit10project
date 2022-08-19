import React, { useState, useContext } from "react";
import  { Context }from "../Context/Context";
import Form from "../Form";
import { Link, useHistory} from "react-router-dom";

const UserSignUp =  () => { 
  const context = useContext(Context);
  let history = useHistory();

  const [firstName, setFirstName ] = useState('');
  const [lastName, setLastName ] = useState('');
  const [ emailAddress, setEmailAddress ] =useState('');
  const [ password, setPassword ] = useState('');
  const [errors, setErrors] = useState([]);

  // const [user, setUser] = useState({
  //   firstName: '',
  //   lastName: '',
  //   emailAddress: '',
  //   password: '',
  // });


  const change = (e) => {
    const value = e.target.value;
    if (e.target.name === "firstName") {
      setFirstName(value);
    } else if (e.target.name === "lastName") {
      setLastName(value);
    } else if (e.target.name === "emailAddress") {
      setEmailAddress(value);
    } else if (e.target.name === "password") {
      setPassword(value);
    } else {
      return;
    }
  };

  // const change = (e) => {
  //   const { name, value } = e.target;
  //   setUser((user) => ({ ...user, [name]: value }));
  // };


  const submit = () => {
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions.signIn(user.emailAddress, user.password).then(() => {
            history.push("/authenticated");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  const cancel = () => {
    history.push("/");
  };

  // cancel = () => {
  //   this.props.history.push('/');
  // };

  return (
    <div className="form form--centered">
        <h1>Sign Up</h1>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={change}
                placeholder="First Name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={change}
                placeholder="Last Name"
              />
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                value={emailAddress}
                onChange={change}
                placeholder="Email Address"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={change}
                placeholder="Password"
              />
            </React.Fragment>
          )}
        />
        <p>
          Already have a user account? <Link to="/signin">Click here</Link> to
          sign in!
        </p>
    </div>
  );
};

export default UserSignUp;