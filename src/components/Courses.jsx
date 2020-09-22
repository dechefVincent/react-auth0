import React, { useState, useEffect } from "react";

const Courses = ({ auth }) => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    fetch("/courses", {
      headers: { Authorization: "Bearer " + auth.getAccessToken() },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Response not ok");
      })
      .then(({ courses }) => setCourses(courses))
      .catch(({ courses }) => setCourses(courses));
    fetch("/admin", {
      headers: { Authorization: "Bearer " + auth.getAccessToken() },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Response not ok");
      })
      .then(({ message }) => console.log(message));
  }, [auth]);

  if (!courses) return null;

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
};

export default Courses;
