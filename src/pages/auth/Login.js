import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import '../../css/login.css'
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      token: "",
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { password, email } = this.state;
    if (!password || !email)
      return this.setState({
        error: "Email and/ or password field can not be empty",
      });
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
            <center>
            <Button block size="lg" type="submit" className="button login-btn">
              Login
            </Button>
            </center>

          </Form>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       saveUserData: saveUserInfoInStateAction,
//     },
//     dispatch
//   );
// };
export default withRouter(Login);
