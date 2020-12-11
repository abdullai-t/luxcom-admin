import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Table, FormControl } from "react-bootstrap";
export default class Reservations extends Component {
  render() {
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>All Reservations</h3>
          <div>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Divider />
        <div className="space-me" id="interactions-container">
          <div>
            {/* <Button variant="contained" color="primary">
              Add New
            </Button> */}
          </div>
          <div className="side-ways">
            <span id="search-name">Search:</span>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
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
  }
}
