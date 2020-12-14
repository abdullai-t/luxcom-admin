import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import { Table, FormControl } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ServiceForm from "./ServiceForm";
import { connect } from "react-redux";
import { deleteServiceFromBackend } from "../../machinery/functions/IneractionFunctions";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddService: false,
      services: [],
      filtered: [],
      toEdit: {},
      editMode: false,
      query:""
    };
  }
  componentWillReceiveProps({ services }) {
    this.setState({ services: services });
  }
  componentDidMount() {
    let services = this.props.services;
    this.setState({ services: services });
  }
  handleShow = () => {
    this.setState({ showAddService: false });
  };

  deleteService = async (item) => {
    let { services } = this.state;
    let filtered = services.filter((x) => x.id !== item.id);
    this.setState({ services: filtered });
    let res = await deleteServiceFromBackend(
      this.props.token,
      item.service_name
    );
    if (res.success) {
      this.props.saveDashboardData();
    }
  };

  editService = (item) => {
    this.setState({ toEdit: item, showAddService: true, editMode: true });
  };

  searchInputListener = (e) => {
    const content = e.target.value.toLowerCase();
    const filtered = this.state.services.filter((service) => {
      const arr = service.service_name.toLowerCase().split(content);
      if (arr.length > 1) return service;
      return null;
    });
    this.setState({ filtered });
  };
  render() {
    const { services, filtered } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Services</h3>
          <div>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Divider />
        <div className="space-me" id="interactions-container">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                this.setState({ showAddService: true, toEdit: "" })
              }
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
              onChange={(e) =>{
                this.setState({ query: e.target.value });
                this.searchInputListener(e)
              } }
            />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length || this.state.query
              ? filtered.map((service, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{service.service_name}</td>
                      <td>{service.cost}</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me edit"
                          onClick={() => this.editService(service)}
                        >
                          <EditIcon id="action-icon" />
                        </div>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteService(service)}
                        >
                          <DeleteIcon id="action-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : services && services.length
              ? services.map((service, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{service.service_name}</td>
                      <td>{service.cost}</td>
                      <td style={{ display: "flex" }}>
                        <div
                          id="action"
                          className="center-me edit"
                          onClick={() => this.editService(service)}
                        >
                          <EditIcon id="action-icon" />
                        </div>
                        <div
                          id="action"
                          className="center-me delete"
                          onClick={() => this.deleteService(service)}
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
        {this.state.editMode || this.state.showAddService ? (
          <ServiceForm
            show={this.state.showAddService}
            toEdit={this.state.toEdit}
            editMode={this.state.editMode}
            handleShow={this.handleShow}
            onHide={() => this.setState({ showAddService: false })}
          />
        ) : null}
      </Paper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    services: state.dashboard.services,
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
export default connect(mapStateToProps, mapDispatchToProps)(Services);
