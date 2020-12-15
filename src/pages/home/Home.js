import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import Paper from "@material-ui/core/Paper";
import RefreshIcon from "@material-ui/icons/Refresh";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import PeopleIcon from "@material-ui/icons/People";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../css/Home.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import { deleteReservation } from "../../machinery/functions/IneractionFunctions";
import TextsmsIcon from "@material-ui/icons/Textsms";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard:{}
    };
  }

  componentWillReceiveProps({ dashboard }) {
    this.setState({ dashboard: dashboard});
  }
  componentDidMount(){
    let dashboard = this.props.dashboard
     this.setState({dashboard:dashboard})     
   }

   deleteUserReservation = async (item) => {
    let { bills } = this.state.dashboard;
    let filtered = bills.filter((x) => x.id !== item.id);
    let newDash = { ...this.state.dashboard };
    newDash.bills = filtered;
    this.setState({ dashboard: newDash });

    let res = await deleteReservation(this.props.token, item.reservation.id);
    if (res.success) {
      this.props.saveDashboardData();
    }
  };
  recentReservations = () => {
    const { bills } = this.state.dashboard;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Recent Reservations</h3>
          <div>
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
            {bills && bills.length
              ? bills.map((bill, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{bill.reservation.guest.fname}</td>
                      <td>{bill.reservation.guest.phone}</td>
                      <td>{bill.reservation.check_in_date}</td>
                      <td>{bill.reservation.check_out_date}</td>
                      <td>{bill.is_paid ? "PAID" :"PENDING"}</td>
                      <td>{bill.reservation.booking_code}</td>
                      <td>{bill.reservation.room.type}</td>
                      <td style={{ display: "flex" }}>
                      <div id="action" className="center-me edit">
                          <TextsmsIcon
                            id="action-icon"
                            // onClick={() => this.editRoom(room)}
                          />
                        </div>
                        <div id="action" className="center-me delete" onClick={()=>this.deleteUserReservation(bill)}>
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
              <MeetingRoomIcon style={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <div id="figures-details">
              <span>Rooms</span>
              <span>{dashboard.room_count}</span>
            </div>
          </div>
          <div
            id="figure-container"
            className="z-depth-2 card-me"
            style={{ backgroundColor: "#28a745" }}
          >
            <Avatar id="avatar" style={{ backgroundColor: "#1E8449" }}>
              <AccountBalanceWalletIcon style={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <div id="figures-details">
              <span>Earnings</span>
              <span>{dashboard.earnings}</span>
            </div>
          </div>
        </div>
        {this.recentReservations()}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
