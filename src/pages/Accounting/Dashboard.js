import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import PeopleIcon from "@material-ui/icons/People";
import "../../css/Home.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import NumberOfMontlyBooking from "./charts/NumberOfMontlyBooking";
import PaidVsUnpaid from "./charts/PaidVsUnpaid";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: {},
      receiver: '',
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
  showNumberOfMontlyBooking = ()=>{
    return(
      <div style={{marginTop:"2rem", padding:"15px 20px"}} className="z-depth-1">
        <NumberOfMontlyBooking />
      </div>
    )
  }
  showPaidVsUnpaid = ()=>{
    return(
      <div style={{marginTop:"2rem", padding:"15px 20px"}} className="z-depth-1">
        <PaidVsUnpaid ratio={this.props.ratio} />
      </div>
    )
  }

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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
