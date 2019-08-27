import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    const navStyle = {
      color: "gray",
    };
    const { isAuthenticated, login, logout, userHasScopes } = this.props.auth;
    return (
      <nav>
        <ul className="nav-links">
          <li>
            <Link style={navStyle} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link style={navStyle} to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link style={navStyle} to="/public">
              Public
            </Link>
          </li>
          {isAuthenticated() && (
            <li>
              <Link style={navStyle} to="/private">
                Private
              </Link>
            </li>
          )}

          {isAuthenticated() && userHasScopes(["read:courses"]) && (
            <li>
              <Link style={navStyle} to="/course">
                Courses
              </Link>
            </li>
          )}

          <li>
            <button onClick={isAuthenticated() ? logout : login}> {isAuthenticated() ? "Log Out" : "Log In"}</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
