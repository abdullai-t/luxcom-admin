import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import RefreshIcon from "@material-ui/icons/Refresh";
import Button from "@material-ui/core/Button";
import { Table, FormControl } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "../../css/rooms.css";
import RoomForm from "./RoomForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import { deleteRoomFromBackend, deleteTable } from "../../machinery/functions/IneractionFunctions";
import Avatar from "@material-ui/core/Avatar";
import ConfirmationModal from "../../reusables/ConfirmationModal";
class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      url: "",
      showAddRoom: false,
      rooms: [],
      toEdit: {},
      editMode: false,
      filtered: [],
      query: "",
      confirm:false,
      table:""
    };
  }

  componentWillReceiveProps({ rooms }) {
    this.setState({ rooms: rooms });
  }
  componentDidMount() {
    let rooms = this.props.rooms;
    this.setState({ rooms: rooms });
  }

  handleShow = () => {
    this.setState({ showAddRoom: false });
  };

  deleteRoom = async (item) => {
    let { rooms } = this.state;
    let filtered = rooms.filter((x) => x.id !== item.id);
    this.setState({ rooms: filtered });
    let res = await deleteRoomFromBackend(this.props.token, item.name);
    if (res && res.success) {
      this.props.saveDashboardData();
    }
  };

  editRoom = (item) => {
    this.setState({ toEdit: item, showAddRoom: true, editMode: true });
  };
  searchInputListener = (e) => {
    const content = e.target.value.toLowerCase();
    const filtered = this.state.rooms.filter((room) => {
      const arr = room.name.toLowerCase().split(content);
      if (arr.length > 1) return room;
      return null;
    });
    this.setState({ filtered });
  };

  deleteAll = async()=>{
    let del = await deleteTable(this.props.token, "ROOMS")
    if (del){
     this.props.saveDashboardData()
     this.setState({confirm:false})
    };
  }
  render() {
    const { rooms, filtered } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Rooms</h3>
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
              onClick={() => this.setState({ showAddRoom: true, toEdit: "" })}
            >
              Add New
            </Button>
            <Button
            style={{marginLeft:"1.5rem"}}
              variant="contained"
              color="secondary"
              onClick={()=>this.setState({confirm:true})}
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
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>No. of Beds</th>
              <th>Bed Size</th>
              <th>Cost</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length || this.state.query
              ? filtered.map((room, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Avatar alt={room.name} src={room.image} />
                      </td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.number_of_beds}</td>
                      <td>{room.bed_size}</td>
                      <td>{room.cost}</td>
                      <td>{room.is_available ? "Available" : "Unavailable"}</td>
                      <td style={{ display: "flex" }}>
                        <div id="action" className="center-me edit">
                          <EditIcon
                            id="action-icon"
                            onClick={() => this.editRoom(room)}
                          />
                        </div>
                        <div id="action" className="center-me delete">
                          <DeleteIcon
                            id="action-icon"
                            onClick={() => this.deleteRoom(room)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : rooms && rooms.length
              ? rooms.map((room, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Avatar alt={room.name} src={room.image} />
                      </td>
                      <td>{room.name}</td>
                      <td>{room.type}</td>
                      <td>{room.number_of_beds}</td>
                      <td>{room.bed_size}</td>
                      <td>{room.cost}</td>
                      <td>{room.is_available ? "Available" : "Unavailable"}</td>
                      <td style={{ display: "flex" }}>
                        <div id="action" className="center-me edit">
                          <EditIcon
                            id="action-icon"
                            onClick={() => this.editRoom(room)}
                          />
                        </div>
                        <div id="action" className="center-me delete">
                          <DeleteIcon
                            id="action-icon"
                            onClick={() => this.deleteRoom(room)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
        {this.state.editMode || this.state.showAddRoom ? (
          <RoomForm
            show={this.state.showAddRoom}
            toEdit={this.state.toEdit}
            editMode={this.state.editMode}
            handleShow={this.handleShow}
            onHide={() => this.setState({ showAddRoom: false })}
          />
        ) : null}
        {this.state.confirm ? (
          <ConfirmationModal
            show={this.state.confirm}
            delete = {()=>this.deleteAll()}
            toEdit={this.state.toEdit}
            handleShow={this.handleShow}
            onHide={() => this.setState({ confirm: false })}
          />
        ) : null}
      </Paper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    rooms: state.dashboard.rooms,
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
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
