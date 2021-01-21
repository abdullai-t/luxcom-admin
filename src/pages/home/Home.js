import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import RefreshIcon from "@material-ui/icons/Refresh";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import PeopleIcon from "@material-ui/icons/People";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../css/Home.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import { deleteReservation } from "../../machinery/functions/IneractionFunctions";
import TextsmsIcon from "@material-ui/icons/Textsms";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import EmailIcon from "@material-ui/icons/Email";
import MessagingForm from "../../reusables/MessagingForm";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import PaidVsUnpaid from "../Accounting/charts/PaidVsUnpaid";
import NumberOfMontlyBooking from "../Accounting/charts/NumberOfMontlyBooking";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: {},
      emailMode: false,
      smsMode: false,
      receiver: "",
      messageType: "",
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
    let { bills_today } = this.state.dashboard;

    let res = await deleteReservation(this.props.token, item.reservation.id);
    if (res && res.success) {
      let filtered = bills_today.filter((x) => x.id !== item.id);
      let newDash = { ...this.state.dashboard };
      newDash.bills_today = filtered;
      this.setState({ dashboard: newDash });
    }
  };

  handleShow = () => {
    this.setState({ emailMode: false, smsMode: false });
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
  recentReservations = () => {
    const { bills_today } = this.state.dashboard;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Recent Reservations</h3>
          <div onClick={this.props.saveDashboardData}>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Guest</th>
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
            {bills_today && bills_today.length
              ? bills_today.map((bill, index) => {
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
                          onClick={() => this.sendEmail(bill.reservation.guest)}
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
      </Paper>
    );
  };

  showNumberOfMontlyBooking = () => {
    return (
      <div
        style={{ marginTop: "2rem", padding: "15px 20px" }}
        className="z-depth-1"
      >
        <NumberOfMontlyBooking />
      </div>
    );
  };
  showPaidVsUnpaid = () => {
    return (
      <div
        style={{ marginTop: "2rem", padding: "15px 20px" }}
        className="z-depth-1"
      >
        <PaidVsUnpaid ratio={this.props.ratio} />
      </div>
    );
  };
  render() {
    const { dashboard } = this.state;
    return (
      <div>
        <div id="figures-main-container">
          <div
            id="figure-container"
            className="z-depth-2 card-me"
            style={{ backgroundColor: "#3598dc" }}
          >
            <Avatar id="avatar" style={{ backgroundColor: "#2874A6" }}>
              <EventSeatIcon style={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <div id="figures-details">
              <span>Reservations</span>
              <span>{dashboard.reservation_count}</span>
            </div>
          </div>
          <div
            id="figure-container"
            className="z-depth-2 card-me"
            style={{ backgroundColor: "#E67D21" }}
          >
            <Avatar id="avatar" style={{ backgroundColor: "#D35400" }}>
              <PeopleIcon style={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <div id="figures-details">
              <span>Guests</span>
              <span>{dashboard.guests_count}</span>
            </div>
          </div>
          <div
            id="figure-container"
            className="z-depth-2 card-me"
            style={{ backgroundColor: "#8E44AD" }}
          >
            <Avatar id="avatar" style={{ backgroundColor: "#7D3C98" }}>
              <ContactSupportIcon style={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <div id="figures-details">
              <span>Responses</span>
              <span>{dashboard.queries_count}</span>
            </div>
          </div>
          <div
            id="figure-container"
            className="z-depth-2 card-me"
            style={{ backgroundColor: "#28a745" }}
          >
            <Avatar id="avatar" style={{ backgroundColor: "#1E8449" }}>
              <AccountBalanceWalletIcon
                style={{ fontSize: 40, color: "white" }}
              />
            </Avatar>
            <div id="figures-details">
              <span>Earnings</span>
              <span>{dashboard.earnings}</span>
            </div>
          </div>
        </div>
        {this.showNumberOfMontlyBooking()}

        {this.showPaidVsUnpaid()}
        {this.recentReservations()}

        {this.state.emailMode || this.state.smsMode ? (
          <MessagingForm
            type={this.state.messageType}
            receiver={this.state.receiver}
            show={this.state.emailMode || this.state.smsMode}
            handleShow={this.handleShow}
            onHide={() => this.setState({ emailMode: false, smsMode: false })}
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
    ratio:state.dashboard.ratio,
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
