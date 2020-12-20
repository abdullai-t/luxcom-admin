import React, { Component } from "react";
import { Button, Form , Spinner} from "react-bootstrap";
import "../../css/login.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LoginUser } from "../../machinery/functions/IneractionFunctions";
import { saveUserInfoInStateAction } from "../../machinery/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      token: "",
      loading: false,
    };
  }

  handleLogin = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const { password, email } = this.state;
    if (!password || !email)
      return this.setState({
        error: "Email and/ or password field can not be empty",
      });
    let user = await LoginUser({
      email: email,
      password: password,
    });
    if (user && user.token) {
      localStorage.setItem("token", user.token);
      this.props.saveUserData({
        token: user.token,
        user: user.data,
      });
      this.setState({ loading: false });
      this.props.history.push("/");
    } else {
      this.setState({ loading: false, error: "unable to login try again !" });
    }
  };

  render() {
    const { password, email, error } = this.state;
    return (
      <div id="login-container">
        <div id="login-form-container" className="z-depth-float card-me">
          <center>
            {" "}
            <p id="login-text">ADMIN LOGIN</p>
          </center>
          <Form id="form" onSubmit={this.handleLogin}>
            {error ? <p id="error-text">{error}</p> : null}
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            {this.state.loading ? (
              <center>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </center>
            ) : (
              <center>
                <Button
                  block
                  size="lg"
                  type="submit"
                  className="button login-btn"
                >
                  Login
                </Button>
              </center>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveUserData: saveUserInfoInStateAction,
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(withRouter(Login));
