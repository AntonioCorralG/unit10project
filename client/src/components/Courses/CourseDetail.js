import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const { data, loggedInuser } = useContext(Context);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  //this get the course with the response from the backend
  useEffect(() => {
    data
      .courseDetail(id)
      .then((res) => 
      {
        setCourse(res)})
      .catch((err) => {
        console.log(err);
      });
  }, [data, id]);

  //determines if the user is the one who created the course and allows for editing
  useEffect(() => {
    if (course && loggedInuser && course.userId === loggedInuser.id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [course, loggedInuser]);

  //method to delete course if the ID matches the logged in user
  const deleteCourseHandler = () => {
    data.deleteCourse(course.id, loggedInuser).then((errors) => {
      if (errors) {
        console.log(errors);
      } else {
        console.log("Course has been deleted.");
      }
    }).then(() => history.push("/"));
  };

  //this moves the user to the update component to PUT an update on a course
  const updateCourseHandler = () => {
    history.push(`/courses/${course.id}/update`);
  };

  return (
    <div className="actions--bar">
      <div className="wrap">
        {isEditing && (
          <span>
            <button onClick={updateCourseHandler} className="button">
              Update Course
            </button>
            <button onClick={deleteCourseHandler} className="button">
              {" "}
              Delete Course
            </button>
          </span>
        )}
        <Link to="/" className="button button-secondary">
          Return to List
        </Link>
      </div>
      <div className="wrap">
        <h2 className="course--detail--label">Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <p className="course--name">{course.title}</p>
              {course.User && (
                <p>
                  By: {course.User.firstName} {course.User.lastName}
                </p>
              )}
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title"> Estimated Time:</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title"> Materials Needed: </h3>
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;
