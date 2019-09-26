import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Nav from "./components/nav/nav";
import Auth from "./components/auth/Auth";
import Callback from "./components/auth/Callback";
import Public from "./components/public/public";
import Private from "./components/private/private";
import Courses from "./components/course/Courses";
import PrivateRoute from "./components/routing/private-route";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { auth: new Auth(this.props.history), tokenRenewalComplete: false };
  }

  componentDidMount() {
    this.state.auth.renewToken(() => this.setState({ tokenRenewalComplete: true }));
  }
  state = {};
  render() {
    const { auth } = this.state;
    // if (!this.state.tokenRenewalComplete) return "Loading...";
    return (
      <>
        <Nav auth={auth} />
        <div className="body">
          <Route path="/" exact render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => <Callback auth={auth} {...props} />} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/profile" component={Profile} auth={auth} />
          <PrivateRoute path="/private" component={Private} auth={auth} />
          <PrivateRoute path="/course" component={Courses} scopes={["read:courses"]} auth={auth} />
        </div>
      </>
    );
  }
}

export default App;
