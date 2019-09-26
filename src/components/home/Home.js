import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Auth from "./components/Auth";

class Home extends Component {
  state = {};
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return (
      <div>
        <h1>Home</h1>
        {isAuthenticated() ? <Link to="/profile"> View Profile</Link> : <button onClick={login}>Log In</button>}
      </div>
    );
  }
}

export default Home;
