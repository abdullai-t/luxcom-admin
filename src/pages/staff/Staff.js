import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Table, FormControl } from "react-bootstrap";
import StaffForm from "./StaffForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import { deleteStaff } from "../../machinery/functions/IneractionFunctions";
class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddStaff: false,
      staff: [],
      filtered: [],
      query: "",
    };
  }
  handleShow = () => {
    this.setState({ showAddStaff: false });
  };
  componentWillReceiveProps({ staff }) {
    this.setState({ staff: staff });
  }
  componentDidMount() {
    let staff = this.props.staff;
    this.setState({ staff: staff });
  }
  searchInputListener = (e) => {
    const content = e.target.value.toLowerCase();
    const filtered = this.state.staff.filter((user) => {
      const arr = user.fname.toLowerCase().split(content);
      if (arr.length > 1) return user;
      return null;
    });
    this.setState({ filtered });
  };

  deleteAStaff = async(user)=>{
    let { staff } = this.state;
    let filtered = staff.filter((x) => x.user !== user.user);
    this.setState({ staff: filtered });
    let res = await deleteStaff(this.props.token, user.fname)
    if (res && res.success){
      this.props.saveDashboardData();
    }
  }
  render() {
    const { staff, filtered } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>All Staff</h3>
          <div onClick = {this.props.saveDashboardData}>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Divider />
        <div className="space-me" id="interactions-container">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ showAddStaff: true })}
            >
              Add New
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
              <th>Email</th>
              <th>ID Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length || this.state.query
              ? filtered.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>
                        {user ? user.fname : "" + " " + user ? user.lname : ""}
                      </td>
                      <td>{user ? user.phone : ""}</td>
                      <td>{user ? user.email : ""}</td>
                      <td>{user ? user.idNumber : ""}</td>
                      <td>{user ? user.homeAddress : ""}</td>
                      <td style={{ display: "flex" }}>
                        <div id="action" className="center-me delete"  onClick={()=>this.deleteAStaff(user)}>
                          <DeleteIcon id="action-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : staff && staff.length
              ? staff.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>
                        {user ? user.fname : "" + " " + user ? user.lname : ""}
                      </td>
                      <td>{user ? user.phone : ""}</td>
                      <td>{user ? user.email : ""}</td>
                      <td>{user ? user.idNumber : ""}</td>
                      <td>{user ? user.homeAddress : ""}</td>
                      <td style={{ display: "flex" }}>
                        <div id="action" className="center-me delete" onClick={()=>this.deleteAStaff(user)}>
                          <DeleteIcon id="action-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        <StaffForm
          show={this.state.showAddStaff}
          handleShow={this.handleShow}
          handleShow={this.handleShow}
          onHide={() => this.setState({ showAddStaff: false })}
        />
      </Paper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    staff: state.dashboard.staff,
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
export default connect(mapStateToProps, mapDispatchToProps)(Staff);
