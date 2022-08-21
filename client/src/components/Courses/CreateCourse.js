import React, { useState, useContext } from "react";
import { Context } from "../Context/Context";
import { Link, useHistory } from "react-router-dom";

const CreateCourse = () => {
  //sets the initial state of the course to be saved into after the change event
  const { data, authenticatedUser } = useContext(Context);
  const [createCourse, setCreateCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: authenticatedUser?.id,
  });
  const [errors, setErrrors] = useState([]);
  const history = useHistory();

  //change method for storing the entered text
  const entered = (e) => {
    const { name, value } = e.target;
    setCreateCourse((course) => ({ ...course, [name]: value }));
  };
//handles the submit button for course creation
  const submitHandler = (e) => {
    e.preventDefault();
    data
      .createCourse(createCourse, authenticatedUser)
      .then((errors) => {
        if (errors.length) {
          setErrrors(errors);
        } else {
          history.push("/");
        }
      })
      // .catch((err) => {
      //   history("./error");
      // });
  };
  return (
    <div className="wrap">
      <h2> Create Course</h2>
      {/* ternary operator for determining whether their are errors, if so then validation errors are shown */}
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
              value={createCourse.title}
              onChange={entered}
            />
            <br></br>
            <div>
              By: {authenticatedUser?.firstName} {authenticatedUser?.lastName}
            </div>
            <br></br>
            <label> Course Description*</label>
            <textarea
              id="description"
              name="description"
              type="textarea"
              value={createCourse.description}
              onChange={entered}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime"> Estimated Time: </label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={createCourse.estimatedTime}
              onChange={entered}
            />
            <br></br>
            <label htmlFor="materialsNeeded">Material Needed:</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="textarea"
              value={createCourse.materialsNeeded}
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
