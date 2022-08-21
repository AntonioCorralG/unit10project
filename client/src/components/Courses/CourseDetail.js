import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const { data, loggedInuser } = useContext(Context);
  const { id } = useParams();
  const [isUpdateDeleteAllowed, setIsUpdateDeleteAllowed] = useState(false);
  const history = useHistory();
  const [fetchDetails, setFetchDetails] = useState(true);

  // Fetch courses from backend
  useEffect(() => {
    if(fetchDetails) {
    data
      .fetchCourseDetailsWithID(id)
      .then((res) => 
      {
        setCourse(res);
        if (course && loggedInuser && course.userId === loggedInuser.id) {
          setIsUpdateDeleteAllowed(true);
        } else {
          setIsUpdateDeleteAllowed(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [data, id, course, loggedInuser, fetchDetails]);

  // Method to delete course if the ID matches the logged in user
  const deleteCourseHandler = () => {
    setFetchDetails(false);
    data.deleteCourse(course.id, loggedInuser).then((errors) => {
      if (errors.length) {
        console.log(errors);
      } else {
        console.log("Course has been deleted.");
        history.push("/");
      }
    })
  };

  // This moves the user to the update component to PUT an update on a course
  const updateCourseHandler = () => {
    history.push(`/courses/${course.id}/update`);
  };

  return (
    <div className="actions--bar">
      <div className="wrap">
        {isUpdateDeleteAllowed && (
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
