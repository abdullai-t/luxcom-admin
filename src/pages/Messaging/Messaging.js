import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  Table,
  Form,
  Row,
  Col,
  Container,
  Button as BTN,
} from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  deleteResponse,
  deleteTable,
  sendGenericMessage,
} from "../../machinery/functions/IneractionFunctions";
import ReplyIcon from "@material-ui/icons/Reply";
import { getDashboardDataAction } from "../../machinery/actions";
import { bindActionCreators } from "redux";
import ConfirmationModal from "../../reusables/ConfirmationModal";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import "../../css/Home.css";
import LinearProgress from "@material-ui/core/LinearProgress";
class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      confirm: false,
      table: "",
      audience: "",
      message: "",
      type: "",
      error: "",
      sending: false,
      subject: "",
    };
  }

  componentWillReceiveProps({ dashboard }) {
    this.setState({ queries: dashboard.queries });
  }
  componentDidMount() {
    let queries = this.props.dashboard.queries;
    this.setState({ queries: queries });
  }

  deleteAQueries = async (query) => {
    const { queries } = this.state;

    let res = await deleteResponse(this.props.token, query.id);
    if (res && res.success) {
      let filtered = queries.filter((x) => x.id !== query.id);
      this.setState({ queries: filtered });
    }
  };
  deleteAll = async () => {
    let del = await deleteTable(this.props.token, "QUERIES");
    if (del) {
      this.props.saveDashboardData();
      this.setState({ confirm: false });
    }
  };

  sendBulkMessage = async (e) => {
    const { audience, message, type } = this.state;
    const { staff, guests, bills } = this.props.dashboard;
    let receivers = [];
    e.preventDefault();
    if (!audience || !type || !message)
      return this.setState({
        error: "please make sure you populate the fields",
      });

    this.setState({ error: "", sending: true });

    if (audience === "ALL_GUESTS") {
      if (guests && guests.length) {
        guests.map((guest) => {
          if (type === "EMAIL") {
            receivers.push(guest.email);
          } else {
            receivers.push(guest.phone);
          }
        });
      } else return [];
    } else if (audience === "ALL_STAFF") {
      if (staff && staff.length) {
        staff.map((ST) => {
          if (type === "EMAIL") {
            receivers.push(ST.email);
          } else {
            receivers.push(ST.phone);
          }
        });
      } else return [];
    } else {
      if (bills && bills.length) {
        bills.map((bill) => {
          if (!bill.isPaid) {
            if (type === "EMAIL") {
              receivers.push(bill.reservation.guest.email);
            } else {
              receivers.push(bill.reservation.guest.phone);
            }
          }
        });
      } else return [];
    }

    let res = await sendGenericMessage(this.props.token, {
      messageType: this.state.type,
      receiver: receivers,
      message: this.state.message,
      subject: this.state.subject,
    });
    if (res && res.success) {
      this.setState({
        sending: false,
        message: "",
        type: "",
        subject: "",
        audience: "",
      });
    } else {
      this.setState({ sending: false, error: "unable to send Message" });
    }
  };

  spitBulkMessaging = () => {
    const { audience, message, type, error, subject } = this.state;
    return (
      <Paper elevation={3} id="bulk-messeging-container">
        <div id="booking-table-header">
          <h3>BULK MESSAGING</h3> 
        </div>
        <Divider />
        <Container id="form-container">
          {error ? <p id="error-text">{error}</p> : null}
          <Row>
            <Col md={6} sm={12}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Message Type</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => this.setState({ type: e.target.value })}
                >
                  <option>Select the type of message</option>
                  <option value="EMAIL">email</option>
                  <option value="SMS">Sms</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              {" "}
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Audience</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => this.setState({ audience: e.target.value })}
                  value={audience}
                >
                  <option>Select your audience</option>
                  <option value="ALL_GUESTS">All Guests</option>
                  <option value="ALL_STAFF">All Staff</option>
                  <option value="PENDING_PAYMENT">
                    Guests with pending payment
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          {this.state.type === "EMAIL" ? (
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => this.setState({ subject: e.target.value })}
              />
            </Form.Group>
          ) : null}
          <Form.Group>
            <Form.Control
              as="textarea"
              id="contact-form-field"
              onChange={(e) => this.setState({ message: e.target.value })}
              value={message}
              placeholder="Enter Your Message......"
              rows={5}
            />
          </Form.Group>
          {this.state.sending ? <LinearProgress color="secondary" /> : null}
          <BTN
            type="submit"
            className="button bulk-message-btn"
            onClick={this.sendBulkMessage}
          >
            Send
          </BTN>
        </Container>
      </Paper>
    );
  };
  spitQuries = () => {
    const { queries } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Response From Users</h3>
          <div onClick={this.props.saveDashboardData}>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Divider />
        <div className="space-me" id="interactions-container">
          <div>
            <Button
              style={{ marginLeft: "1.5rem" }}
              variant="contained"
              color="secondary"
              onClick={() => this.setState({ confirm: true })}
            >
              DELETE TABLE
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries && queries.length
              ? queries.map((query, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{query.name}</td>
                      <td>{query.email}</td>
                      <td>{query.type}</td>
                      <td>{query.message}</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me edit"
                          onClick={() => alert("Do you want To reply ? Well I am not configured!!!!!")}
                        >
                          <ReplyIcon id="action-icon" />
                        </div>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteAQueries(query)}
                        >
                          <DeleteIcon id="action-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </Paper>
    );
  };
  render() {
    return (
      <div>
        {this.spitBulkMessaging()}
        {this.spitQuries()}
        {this.state.confirm ? (
          <ConfirmationModal
            show={this.state.confirm}
            delete={() => this.deleteAll()}
            toEdit={this.state.toEdit}
            handleShow={this.handleShow}
            onHide={() => this.setState({ confirm: false })}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
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

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
