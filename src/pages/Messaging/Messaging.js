import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import "../../css/Home.css";
import { connect } from "react-redux";
import { deleteReservation, deleteResponse,deleteTable } from "../../machinery/functions/IneractionFunctions";
import TextsmsIcon from "@material-ui/icons/Textsms";
import EmailIcon from "@material-ui/icons/Email";
import ReplyIcon from '@material-ui/icons/Reply';
import { getDashboardDataAction } from "../../machinery/actions";
import { bindActionCreators } from "redux";
import ConfirmationModal from "../../reusables/ConfirmationModal";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
class Messaging extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      confirm:false,
      table:""
    };
  }

  componentWillReceiveProps({ dashboard }) {
    this.setState({ queries: dashboard.queries });
  }
  componentDidMount() {
    let queries = this.props.dashboard.queries;
    this.setState({ queries: queries });
  }

  deleteAQueries = async(query)=>{
    const { queries } = this.state;
    let filtered = queries.filter((x) => x.id !== query.id);
    this.setState({queries:filtered})
    
    let res = await deleteResponse(this.props.token, query.id)
    if (res && res.success){
        this.props.saveDashboardData()
    }
  }
  deleteAll = async()=>{
    let del = await deleteTable(this.props.token, "QUERIES")
    if (del){
     this.props.saveDashboardData()
     this.setState({confirm:false})
    };
  }

  spitQuries = () => {
    const { queries } = this.state;
    return (
      <Paper elevation={3} id="surface">
        <div id="booking-table-header">
          <h3>Response From Users</h3>
          <div onClick = {this.props.saveDashboardData}>
            <RefreshIcon style={{ color: "grey" }} />
          </div>
        </div>
        <Divider />
        <div className="space-me" id="interactions-container">
          <div>
            <Button
            style={{marginLeft:"1.5rem"}}
              variant="contained"
              color="secondary"
              onClick={()=>this.setState({confirm:true})}
            >
              DELETE TABLE
            </Button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries && queries.length
              ? queries.map((query, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{query.name}</td>
                      <td>{query.email}</td>
                      <td>{query.type}</td>
                      <td>{query.message}</td>
                      <td style={{ display: "flex" }}>
                      <div id="action" className="center-me edit"  onClick={()=>this.deleteAStaff(query)}>
                          <ReplyIcon id="action-icon" />
                        </div>
                        <div id="action" className="center-me delete"  onClick={()=>this.deleteAQueries(query)}>
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
    return (
      <div>
        {this.spitQuries()}
        {this.state.confirm ? (
          <ConfirmationModal
            show={this.state.confirm}
            delete = {()=>this.deleteAll()}
            toEdit={this.state.toEdit}
            handleShow={this.handleShow}
            onHide={() => this.setState({ confirm: false })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
