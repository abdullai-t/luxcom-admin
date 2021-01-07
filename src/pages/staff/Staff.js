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
import { deleteStaff , deleteUser} from "../../machinery/functions/IneractionFunctions";
class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddStaff: false,
      staff: [],
      filtered: [],
      query: "",
      addAccountant: false,
      admins: [],
    };
  }
  handleShow = () => {
    this.setState({ showAddStaff: false });
  };
  componentWillReceiveProps({ staff, admins }) {
    this.setState({ staff: staff, admins });
  }
  componentDidMount() {
    let staff = this.props.staff;
    let admins = this.props.admins;
    this.setState({ staff: staff, admins: admins });
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

  deleteAStaff = async (user) => {
    let { staff } = this.state;
    let res = await deleteStaff(this.props.token, user.fname);
    if (res && res.success) {
      let filtered = staff.filter((x) => x.fname !== user.fname);
      this.setState({ staff: filtered });
    }
  };

  deleteAdmin = async (user) => {
    let { admins } = this.state;
    let res = await deleteUser(this.props.token, user.username);
    if (res && res.success) {
      let filtered = admins.filter((x) => x.fname !== user.fname);
      this.setState({ admins: filtered })
      
    }
  };

  spitOtherUsers = () => {
    const { admins } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Other Admins</h3>
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
              onClick={() => this.setState({ addAccountant:true, showAddStaff: true })}
            >
              Add New
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Type</th>
              <th>Nationality</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins && admins.length
              ? admins.map((admin, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>{admin.fname + "  " + admin.lname}</th>
                      <th>{admin.username}</th>
                      <th>{admin.phone}</th>
                      <th>{admin.email}</th>
                      <th>{admin.is_accountant ? "Accountant" : "Admin"}</th>
                      <th>{admin.nationality}</th>
                      <th>{admin.homeAddress}</th>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={()=>this.deleteAdmin(admin)}
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

  spitStaff = () => {
    const { staff, filtered } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>All Staff</h3>
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
              onClick={() => this.setState({  addAccountant:false,showAddStaff: true })}
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
              <th>Job</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length || this.state.query
              ? filtered.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user ? user.fname + " " + user.lname : ""}</td>
                      <td>{user ? user.phone : ""}</td>
                      <td>{user ? user.email : ""}</td>
                      <td>{user ? user.idNumber : ""}</td>
                      <td>{user ? user.job : ""}</td>
                      <td>{user ? user.homeAddress : ""}</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteAStaff(user)}
                        >
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
                      <td>{index + 1}</td>
                      <td>{user ? user.fname + " " + user.lname : ""}</td>
                      <td>{user ? user.phone : ""}</td>
                      <td>{user ? user.email : ""}</td>
                      <td>{user ? user.idNumber : ""}</td>
                      <td>{user ? user.job : ""}</td>
                      <td>{user ? user.homeAddress : ""}</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteAStaff(user)}
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
        {this.state.showAddStaff ? (
          <StaffForm
            show={this.state.showAddStaff}
            handleShow={this.handleShow}
            handleShow={this.handleShow}
            onHide={() => this.setState({ showAddStaff: false })}
            addAccountant={this.state.addAccountant}
          />
        ) : null}
      </Paper>
    );
  };
  render() {
    return (
      <div>
        {this.spitOtherUsers()}
        {this.spitStaff()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    staff: state.dashboard.staff,
    admins: state.dashboard.admins,
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
