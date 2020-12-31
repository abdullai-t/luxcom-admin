import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Form, Row, Col } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import "../../css/profile.css";
import { saveUserInfoInStateAction } from "../../machinery/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changePassword,
  updateUserProfile,
  getUserProfileData,
} from "../../machinery/functions/IneractionFunctions";
import LinearProgress from "@material-ui/core/LinearProgress";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      fname: "",
      lname: "",
      phone: "",
      email: "",
      username: "",
      password1: "",
      password2: "",
      oldPassword: "",
      loading: false,
      address:""
    };
  }

  changeMyPassword = async (e) => {
    e.preventDefault();

    const { password1, password2 } = this.state;
    if (!password1 || !password2 || password1 !== password2)
      return this.setState({ info: "please Check the passwords" });
    this.setState({ loading: true, info: "" });

    let res = await changePassword(this.props.user.token, {
      new_password1: password1,
      new_password2: password2,
    });
    if (res.success) {
      this.setState({ info: "password successfully changed", loading: false, openToast:true });
    }
  };

  updateProfile = async (e) => {
    e.preventDefault();
    let res = await updateUserProfile(this.props.user.token, {
      fname: this.state.fname,
      lname: this.state.lname,
      phone: this.state.phone,
      email: this.state.email,
      homeAddress:this.state.address
    });
    if (res && res.data) {
      let data = await getUserProfileData(this.props.user.token);
      if (data) {
        this.props.saveUserData({
          user: data.data[0],
          token: this.props.user.token,
        });
        this.setState({ editMode: false });
      }
    }
  };

  render() {
    const { fname, lname, phone, email,address } = this.state;
    const { user } = this.props.user;
    return (
      <div id="profile-container">
        <Paper elevation={3} id="user-info-container">
          <div id="profile-header">
            <h3>User Information</h3>
            <div className="center-me edit-mode-btn">
              {!this.state.editMode ? (
                <EditIcon
                  id="edit-mode-icon"
                  onClick={() =>
                    this.setState({
                      fname: user.fname,
                      lname: user.lname,
                      email: user.email,
                      phone: user.phone,
                      editMode: true,
                    })
                  }
                />
              ) : (
                <ClearIcon
                  id="edit-mode-icon"
                  onClick={() => this.setState({ editMode: false })}
                />
              )}
            </div>
          </div>
          {this.state.editMode ? (
            <Form id="form">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      autoFocus
                      type="text"
                      value={fname}
                      onChange={(e) => this.setState({ fname: e.target.value })}
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      placeholder="Last Name"
                      autoFocus
                      type="text"
                      value={lname}
                      onChange={(e) => this.setState({ lname: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email"
                  disabled
                  autoFocus
                  type="Email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="phone number"
                  value={phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="phone number"
                  value={address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </Form.Group>
              <center style={{ marginTop: "1.2rem" }}>
                {" "}
                <Button
                  variant="primary"
                  type="submit"
                  className="button"
                  onClick={this.updateProfile}
                >
                  Save info
                </Button>
              </center>
            </Form>
          ) : (
            <div>
              <div id="info-item">
                <span>Full Name</span>
                <p>{user ? user.fname + "  " + user.lname : "" }</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Email</span>
                <p>{user ? user.email : ""}</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Username</span>
                <p>{user ? user.username : ""}</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Phone</span>
                <p>{user ? user.phone : ""}</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Address</span>
                <p>{user ? user.homeAddress : ""}</p>
                <Divider />
              </div>
            </div>
          )}
        </Paper>

        <Paper elevation={3} id="password-change-container">
          <center id="profile-header">
            <h3>Change Password</h3>
          </center>
          <Form id="form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Old password"
                value={this.state.oldPassword}
                onChange={(e) => this.setState({ oldPassword: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={this.state.password1}
                onChange={(e) => this.setState({ password1: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={this.state.password2}
                onChange={(e) => this.setState({ password2: e.target.value })}
              />
            </Form.Group>
            <center style={{ marginTop: "1.2rem" }}>
              {" "}
              <Button
                variant="primary"
                type="submit"
                className="button"
                onClick={this.changeMyPassword}
              >
                Change Password
              </Button>
            </center>
            {this.state.loading ? <LinearProgress color="secondary" /> : null}
          </Form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveUserData: saveUserInfoInStateAction,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
