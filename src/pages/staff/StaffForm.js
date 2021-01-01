import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CreateStaff, addAdmin } from "../../machinery/functions/IneractionFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
class StaffForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      password: "",
      error: "",
      fname: "",
      lname: "",
      address: "",
      phone: "",
      nationality: "",
      job: "",
      addAccountant: false,
      type: "",
    };
  }

  componentDidMount() {
    this.setState({ addAccountant: this.props.addAccountant });
  }
  componentWillReceiveProps({ addAccountant }) {
    this.setState({ addAccountant: addAccountant });
  }

  addStaff = async (e) => {
    e.preventDefault();
    const {
      email,
      address,
      fname,
      lname,
      phone,
      nationality,
      job,
      type,
      password
    } = this.state;
    if (!email || !address || !fname || !lname)
      return this.setState({ error: "make sure all fields are populated" });
    this.setState({ error: "", loading: true });
    let user;
    if (this.state.addAccountant){
      user = await addAdmin({
        email: email,
        fname: fname,
        lname: lname,
        homeAddress: address,
        phone: phone,
        nationality: nationality,
        username: fname,
        job: type,
        password:password,
        password2:password
      });
    }
    else{
      user = await CreateStaff({
        email: email,
        fname: fname,
        lname: lname,
        homeAddress: address,
        phone: phone,
        nationality: nationality,
        username: fname,
        job: job,
      });
    }
   
    if (user.data) {
      this.props.saveDashboardData();
      this.setState({ loading: false });
      this.props.handleShow();
    } else {
      this.setState({
        error: "Error occured while adding staff",
        loading: false,
      });
    }
  };
  render() {
    const {
      password,
      email,
      address,
      fname,
      lname,
      phone,
      error,
      nationality,
      job,
      type,
    } = this.state;
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.addAccountant ? "Admin" : "Staff"} Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form" onSubmit={this.addStaff}>
            {error ? <p id="error-text">{error}</p> : null}
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
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    value={address}
                    onChange={(e) => this.setState({ address: e.target.value })}
                    placeholder="1234 Main St"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    value={nationality}
                    onChange={(e) =>
                      this.setState({ nationality: e.target.value })
                    }
                    placeholder="Ghanaian"
                  />
                </Form.Group>
              </Col>
            </Row>
            {this.state.addAccountant ? (
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      autoFocus
                      type="text"
                      value={phone}
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      placeholder="05505050"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Admin Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={type}
                      onChange={(e) => this.setState({ type: e.target.value })}
                    >
                      <option>Select Admin type</option>
                      <option value="ACCOUNTANT">Accountant</option>
                      <option value="ADMIN">Admin</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={phone}
                  onChange={(e) => this.setState({ phone: e.target.value })}
                  placeholder="05505050"
                />
              </Form.Group>
            )}

            <Row>
              <Col>
                <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                {this.state.addAccountant ? (
                  <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </Form.Group>
                ) : (
                  <Form.Group size="lg" controlId="password">
                    <Form.Label>Job</Form.Label>
                    <Form.Control
                      type="text"
                      value={job}
                      onChange={(e) => this.setState({ job: e.target.value })}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
          </Form>
          {this.state.loading ? <LinearProgress color="secondary" /> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button className="button" variant="primary" onClick={this.addStaff}>
            Save {this.props.addAccountant ? "Admin" : "Staff"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      saveDashboardData: getDashboardDataAction,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StaffForm));
