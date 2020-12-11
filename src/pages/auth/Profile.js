import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Form, Row, Col } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import "../../css/profile.css";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      fname: "",
      lname: "",
      phone: "",
      email: "",
      username: "",
    };
  }

  render() {
    const { fname, lname, phone, email, username } = this.state;
    return (
      <div id="profile-container">
        <Paper elevation={3} id="user-info-container">
          <div id="profile-header">
            <h3>User Information</h3>
            <div className="center-me edit-mode-btn">
              {!this.state.editMode ? (
                <EditIcon id="edit-mode-icon" onClick={()=>this.setState({editMode:true})} />
              ) : (
                <ClearIcon id="edit-mode-icon" onClick={()=>this.setState({editMode:false})} />
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
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      autoFocus
                      type="text"
                      value={username}
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder="Email"
                      autoFocus
                      type="Email"
                      value={lname}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="phone number" />
              </Form.Group>
              <center style={{ marginTop: "1.2rem" }}>
                {" "}
                <Button variant="primary" type="submit" className="button">
                  Save info
                </Button>
              </center>
            </Form>
          ) : (
            <div>
              <div id="info-item">
                <span>Full Name</span>
                <p>Abdullai Tahiru</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Username</span>
                <p>Tachyon</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Email</span>
                <p>abdullai.tahiru@gmial.com</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Staf ID</span>
                <p>20511728</p>
                <Divider />
              </div>
              <div id="info-item">
                <span>Phone</span>
                <p>+233501654928</p>
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
              <Form.Control type="password" placeholder="Enter Old password" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
              />
            </Form.Group>
            <center style={{ marginTop: "1.2rem" }}>
              {" "}
              <Button variant="primary" type="submit" className="button">
                Change Password
              </Button>
            </center>
          </Form>
        </Paper>
      </div>
    );
  }
}