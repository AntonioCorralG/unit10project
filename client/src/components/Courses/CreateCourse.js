import React, { useState, useContext } from "react";
import { Context } from "../Context/Context";
import { Link, useHistory } from "react-router-dom";

const CreateCourse = () => {
  const { data, loggedInuser } = useContext(Context);
  const [title, setTitle ] = useState('');
  const [description, setDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] =useState('');
  const [ materialsNeeded, setMaterialNeeded ] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrrors] = useState([]);
  const history = useHistory();

  const entered = (e) => {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    } else if (e.target.name === "description") {
      setDescription(value);
    } else if (e.target.name === "estimatedTime") {
      setEstimatedTime(value);
    } else if (e.target.name === "materialsNeeded") {
      setMaterialNeeded(value);
    }
  };

// Creates the course of all the fields are valid
  const submitHandler = (e) => {
    e.preventDefault();
    setUserId(loggedInuser?.id);
    const createCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    }
    data
      .createCourse(createCourse, loggedInuser)
      .then((errors) => {
        if (errors.length) {
          setErrrors(errors);
        } else {
          history.push("/");
        }
      })
  };
  return (
    <div className="wrap">
      <h2> Create Course</h2>
      {/* ternary operator for determining whether there are errors, if so then validation errors are shown */}
      {errors.length ? (
        <>
          <div className="validation--errors">
            <h3>Validation errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
      <form onSubmit={submitHandler}>
        <div className="main--flex">
          <div>
            <label> Course Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={entered}
            />
            <br></br>
            <div>
              By: {loggedInuser?.firstName} {loggedInuser?.lastName}
            </div>
            <br></br>
            <label> Course Description*</label>
            <textarea
              id="description"
              name="description"
              type="textarea"
              value={description}
              onChange={entered}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime"> Estimated Time: </label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={estimatedTime}
              onChange={entered}
            />
            <br></br>
            <label htmlFor="materialsNeeded">Material Needed:</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="textarea"
              value={materialsNeeded}
              onChange={entered}
            />
          </div>
        </div>
        <p>* Mandatory Items</p>
        <button className="button" type="submit">
          Create Course
        </button>
        <Link to="/" className="button-secondary button">
          Cancel
        </Link>{" "}
      </form>
    </div>
  );
};

export default CreateCourse;
