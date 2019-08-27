import React, { Component } from "react";
import "./App.css";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./nav";
import Auth from "./components/Auth";
import Callback from "./components/Callback";
import Public from "./public";
import Private from "./private";
import Courses from "./Courses";
import PrivateRoute from "./private-route";
class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  state = {};
  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <div className="body">
          <Route path="/" exact render={(props) => <Home auth={this.auth} {...props} />} />
          <Route path="/callback" render={(props) => <Callback auth={this.auth} {...props} />} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/profile" component={Profile} auth={this.auth} />
          <PrivateRoute path="/private" component={Private} auth={this.auth} />
          <PrivateRoute path="/course" component={Courses} scopes={["read:courses"]} auth={this.auth} />
        </div>
      </>
    );
  }
}

export default App;
