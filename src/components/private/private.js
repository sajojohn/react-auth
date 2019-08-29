import React, { Component } from "react";

class Private extends Component {
  state = { message: "" };
  componentDidMount() {
    // fetch("/private", {
    //   headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    // })
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then((response) => this.setState({ message: response.message }))
    //   .catch((error) => this.setState({ message: error.message }));
    this.getData();
  }

  // below method calls the same api using async and  await. This is much cleaner than promises
  getData = async () => {
    const apiCall = await fetch("/private", { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } });
    if (apiCall.ok) {
      const data = await apiCall.json();
      this.setState({ message: data.message });
    } else {
      this.setState({ message: "Network response was not ok" });
    }
  };
  render() {
    const { message } = this.state;
    return <p>{message}</p>;
  }
}

export default Private;
