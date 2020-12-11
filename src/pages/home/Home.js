import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import Paper from "@material-ui/core/Paper";
import RefreshIcon from "@material-ui/icons/Refresh";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import PeopleIcon from "@material-ui/icons/People";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { Table } from "react-bootstrap";
import DeleteIcon from '@material-ui/icons/Delete';
import "../../css/Home.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  recentReservations = () => {
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
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td style={{ display: "flex" }}>
                <div id="action" className="center-me delete">
                  <DeleteIcon id="action-icon" />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    );
  };
  render() {
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
              <span>450</span>
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
              <span>450</span>
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
              <span>Ocupied Rooms</span>
              <span>450</span>
            </div>
          </div>
          <div
            id="figure-container"
            className="z-depth-2 card-me"
            style={{ backgroundColor: "#28a745" }}
          >
            <Avatar id="avatar" style={{ backgroundColor: "#1E8449" }}>
              <FolderIcon style={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <div id="figures-details">
              <span>Reservations</span>
              <span>450</span>
            </div>
          </div>
        </div>
        {this.recentReservations()}
      </div>
    );
  }
}
