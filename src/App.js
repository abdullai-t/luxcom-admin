import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Protected from './reusables/Protected';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import Profile from './pages/auth/Profile';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Protected exact path="/" />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}
