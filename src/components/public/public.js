import React, { Component } from "react";

class Public extends Component {
  state = { message: "" };
  componentDidMount() {
    // fetch("/public")
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then((response) => this.setState({ message: response.message }))
    //   .catch((error) => this.setState({ message: error.message }));
    this.fetchData();
  }

  fetchData = async () => {
    const apiCall = await fetch("/public");

    if (apiCall.ok) {
      const response = await apiCall.json();
      this.setState({ message: response.message });
    } else {
      this.setState({ message: "Network response was not ok" });
    }
  };
  render() {
    const { message } = this.state;
    return <p>{message}</p>;
  }
}

export default Public;
