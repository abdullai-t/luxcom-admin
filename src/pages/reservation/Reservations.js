import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import {
  deleteReservation,
  deleteTable,
} from "../../machinery/functions/IneractionFunctions";
import TextsmsIcon from "@material-ui/icons/Textsms";
import EmailIcon from "@material-ui/icons/Email";
import MessagingForm from "../../reusables/MessagingForm";
import Button from "@material-ui/core/Button";
import ConfirmationModal from "../../reusables/ConfirmationModal";
import ReservationForm from "./ReservationForm";

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: {},
      filtered: [],
      query: "",
      emailMode: false,
      smsMode: false,
      receiver: "",
      messageType: "",
      confirm: false,
      table: "",
      addReservation: false,
    };
  }

  componentWillReceiveProps({ dashboard }) {
    this.setState({ dashboard: dashboard });
  }
  componentDidMount() {
    let dashboard = this.props.dashboard;
    this.setState({ dashboard: dashboard });
  }
  deleteUserReservation = async (item) => {
    let { bills } = this.state.dashboard;
    let res = await deleteReservation(this.props.token, item.reservation.id);
    if (res && res.success) {
      let filtered = bills.filter((x) => x.id !== item.id);
      let newDash = { ...this.state.dashboard };
      newDash.bills = filtered;
      this.setState({ dashboard: newDash }, () =>
        this.props.saveDashboardData()
      );
    }
  };

  searchInputListener = (e) => {
    let { bills } = this.state.dashboard;
    const content = e.target.value.toLowerCase();
    const filtered = bills.filter((bill) => {
      const arr = bill.reservation.guest.fname.toLowerCase().split(content);
      if (arr.length > 1) return bill;
      return null;
    });
    this.setState({ filtered });
  };

  sendSMS = (user) => {
    this.setState({ receiver: user.phone, messageType: "SMS" }, () =>
      this.setState({ smsMode: true })
    );
  };
  sendEmail = (user) => {
    this.setState({ receiver: user.email, messageType: "EMAIL" }, () =>
      this.setState({ emailMode: true })
    );
  };

  handleShow = () => {
    this.setState({ emailMode: false, smsMode: false, addReservation: false });
  };

  deleteAll = async () => {
    let del = await deleteTable(this.props.token, "RESERVATIONS");
    if (del) {
      this.props.saveDashboardData();
      this.setState({ confirm: false });
    }
  };
  render() {
    const { bills } = this.state.dashboard;
    const { filtered } = this.state;
    return (
      <div>
        <Paper elevation={3} id="surface">
          <div id="booking-table-header">
            <h3>Reservations</h3>
            <div onClick={this.props.saveDashboardData}>
              <RefreshIcon style={{ color: "grey" }} />
            </div>
          </div>
          <Divider />
          <div className="space-me" id="interactions-container">
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ addReservation: true })}
              >
                Add New
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "1.5rem" }}
                onClick={() => this.setState({ confirm: true })}
              >
                DELETE TABLE
              </Button>
            </div>
            <div className="side-ways">
              <span id="search-name">Search:</span>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => {
                  this.setState({ query: e.target.value });
                  this.searchInputListener(e);
                }}
              />
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Booking ID</th>
                <th>Room Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length || this.state.query
                ? filtered.map((bill, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{bill.reservation.guest.fname}</td>
                        <td>{bill.reservation.guest.phone}</td>
                        <td>{bill.reservation.check_in_date}</td>
                        <td>{bill.reservation.check_out_date}</td>
                        <td>{bill.is_paid ? "PAID" : "PENDING"}</td>
                        <td>{bill.reservation.booking_code}</td>
                        <td>{bill.reservation.room.type}</td>
                        <td style={{ display: "flex" }}>
                          <div
                            id="action"
                            className="center-me edit"
                            onClick={() => this.sendSMS(bill.reservation.guest)}
                          >
                            <TextsmsIcon id="action-icon" />
                          </div>
                          <div
                            id="action"
                            className="center-me edit"
                            onClick={() =>
                              this.sendEmail(bill.reservation.guest)
                            }
                          >
                            <EmailIcon id="action-icon" />
                          </div>
                          <div
                            id="action"
                            className="center-me delete"
                            onClick={() => this.deleteUserReservation(bill)}
                          >
                            <DeleteIcon id="action-icon" />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : bills && bills.length
                ? bills.map((bill, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{bill.reservation.guest.fname}</td>
                        <td>{bill.reservation.guest.phone}</td>
                        <td>{bill.reservation.check_in_date}</td>
                        <td>{bill.reservation.check_out_date}</td>
                        <td>{bill.is_paid ? "PAID" : "PENDING"}</td>
                        <td>{bill.reservation.booking_code}</td>
                        <td>{bill.reservation.room.type}</td>
                        <td style={{ display: "flex" }}>
                          <div
                            id="action"
                            className="center-me edit"
                            onClick={() => this.sendSMS(bill.reservation.guest)}
                          >
                            <TextsmsIcon id="action-icon" />
                          </div>
                          <div
                            id="action"
                            className="center-me edit"
                            onClick={() =>
                              this.sendEmail(bill.reservation.guest)
                            }
                          >
                            <EmailIcon id="action-icon" />
                          </div>
                          <div
                            id="action"
                            className="center-me delete"
                            onClick={() => this.deleteUserReservation(bill)}
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
          {this.state.emailMode || this.state.smsMode ? (
            <MessagingForm
              type={this.state.messageType}
              receiver={this.state.receiver}
              show={this.state.emailMode || this.state.smsMode}
              handleShow={this.handleShow}
              onHide={() => this.setState({ emailMode: false, smsMode: false })}
            />
          ) : null}

          {this.state.confirm ? (
            <ConfirmationModal
              show={this.state.confirm}
              delete={() => this.deleteAll()}
              toEdit={this.state.toEdit}
              handleShow={this.handleShow}
              onHide={() => this.setState({ confirm: false })}
            />
          ) : null}
          {this.state.addReservation ? (
            <ReservationForm
              show={this.state.addReservation}
              handleShow={this.handleShow}
              onHide={() => this.setState({ addReservation: false })}
            />
          ) : null}
        </Paper>
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
export default connect(mapStateToProps, mapDispatchToProps)(Reservations);
