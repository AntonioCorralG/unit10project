import React, { useContext, useState, useEffect } from "react";
import { Context } from "../Context/Context";
import { Link, useHistory, useParams } from "react-router-dom";

//allows for updates to the course if the user.id matche the course.id
const UpdateCourse = () => {
  const { data, authenticatedUser } = useContext(Context);
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({});
  const history = useHistory();
  const { id } = useParams();

  //
  useEffect(() => {
    data
      .courseDetail(id)
      .then((course) => {
        setCourse(course)})
      .catch((err) => console.log(err));
  }, [data, id]);

//catches user changes and updates them on the DOM
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setCourse((course) => ({ ...course, [name]: value }));
  };
//submits updates to the course
  const submitHandler = (event) => {
    event.preventDefault();
    data
      .updateCourse(course, authenticatedUser)
      .then((errors) => {
        if (errors.lengrth) {
          setErrors(errors);
        } else {
          history.push(`/courses/${id}`);
        }
      })
      .catch((err) => {
        history.push("/notfound");
      });
  };
  return (
    
    <div className="wrap">
      {authenticatedUser?.id === course?.userId ? (
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
                By: {authenticatedUser?.firstName} {authenticatedUser?.lastName}
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
        <div> You cannot update the course.</div>
      )}
    </div>
  );
};

export default UpdateCourse;
