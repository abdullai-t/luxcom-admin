import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Protected from "./reusables/Protected";
import Login from "./pages/auth/Login";
import {
  saveUserInfoInStateAction,
  getDashboardDataAction,
} from "./machinery/actions";
import { getUserProfileData } from "./machinery/functions/IneractionFunctions";
class App extends Component {
  async componentDidMount() {
    this.props.saveDashboardData();
    let token = localStorage.getItem("token");
    if (token) {
      let data = await getUserProfileData(token);
      if (data) {
        this.props.saveUserData({
          user: data.data[0],
          token: token,
        });
      }
    }
  }
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveUserData: saveUserInfoInStateAction,
      saveDashboardData: getDashboardDataAction,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(App);
