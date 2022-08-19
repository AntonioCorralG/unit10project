import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";

//sets the courses state
const Courses = (props) => {
  const [courses, setCourses] = useState([]);
  const { data } = useContext(Context);

  //borrowed
  useEffect(() => {
    data
      .getCourses()
      .then((res) => setCourses(res))
      .catch((err) => console.log(err));
  }, [data]);
  //borrowed

  return (
    <div className="wrap main--grid">
      {/* maps the courses out and provides a link to direct the user to the course */}
      {courses.map((courses, index) => (
        <Link
          className="course--module course--link"
          to={`courses/${courses.id}`}
          key={index}
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{courses.title}</h3>
        </Link>
      ))}
  <Link
    to={`courses/create`}
    className= 'course--add--module course--module'
    >
      <span className="course--add--title">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 13 13"
          className="add"
        >
          <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
        </svg>
        New Course
      </span>
      </Link>
    </div>
  );
};

export default Courses;
