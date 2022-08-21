// This component will allow a user to update the course if they are the owner 
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../Context/Context";
import { Link, useHistory, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { data, loggedInuser } = useContext(Context);
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    data
      .courseDetail(id)
      .then((course) => {
        setCourse(course)})
      .catch((err) => console.log(err));
  }, [data, id]);

// Handles the user input ans updates the course details on the page
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setCourse((course) => ({ ...course, [name]: value }));
  };
// Submit the user changes for course update
  const submitHandler = (event) => {
    event.preventDefault();
    data
      .updateCourse(course, loggedInuser)
      .then((errors) => {
        if (errors.lengrth) {
          setErrors(errors);
        } else {
          history.push(`/courses/${id}`);
        }
      })
      .catch((err) => {
        history.push("/invalidPath");
      });
  };
  return (
    
    <div className="wrap">
      {loggedInuser?.id === course?.userId ? (
        <div><h2> Update Course</h2>
        {errors.length ? (
          <div>
            <div className="validation--errors">
              <h3> Validation Errors! </h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <form onSubmit={submitHandler}>
          <div classname="main--flex">
            <div>
              <label htmlFor="title"> Course Title </label>
              <input
                onChange={changeHandler}
                id="title"
                name="title"
                type="text"
                value={course?.title}
              />
              <p>
                By: {loggedInuser?.firstName} {loggedInuser?.lastName}
              </p>
  
              <label htmlFor="description">Course Description </label>
              <input
                onChange={changeHandler}
                id="description"
                name="description"
                value={course?.description}
              />
            </div>
          </div>
          <div>
            <label htmlFor="estimatedTime"> Estimated Time: </label>
            <input
              onChange={changeHandler}
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course?.materialsNeeded}
            />
            <label htmlFor="materialsNeeded"> Materials Needed:</label>
            <input
              onChange={changeHandler}
              id="materialsNeeded"
              name="materialsNeeded"
              value={course?.materialsNeeded}
            />{" "}
          </div>
          <button className="button" type='submit'>
            Update Course
          </button>
          <Link className="button button-secondary" to={`/courses/${id}`}>
            Cancel
          </Link>
        </form></div>
      ) : (
        <div> <p>You are not authorised to update the course.</p>
          <div className="wrap">
          <Link to="/" className="button button-secondary">
          List courses
        </Link>
        </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCourse;
