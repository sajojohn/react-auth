import React, { Component } from "react";

class Courses extends Component {
  state = { courses: [] };
  componentDidMount() {
    fetch("/course", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ courses: response.courses }))
      .catch((error) => this.setState({ message: error.message }));

    fetch("/admin", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((response) => console.log(response))
      .catch((error) => this.setState({ message: error.message }));
  }
  render() {
    const { courses } = this.state;
    return (
      <ul>
        {courses.map((course) => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    );
  }
}

export default Courses;
