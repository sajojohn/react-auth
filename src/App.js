import React, { Component } from "react";
import { Route } from "react-router-dom";
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
