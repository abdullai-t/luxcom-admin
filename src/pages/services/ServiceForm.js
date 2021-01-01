import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  saveServiceToBackend,
  saveServiceEditToBackend,
} from "../../machinery/functions/IneractionFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service_name: "",
      cost: "",
      loading: false,
      editMode: false,
      id: "",
    };
  }
  componentWillReceiveProps({ editMode, toEdit }) {
    this.setState({
      editMode: editMode,
      service_name: toEdit.service_name,
      cost: toEdit.cost,
      id: toEdit.id,
    });
  }

  saveService = async () => {
    this.setState({ loading: true });
    const { service_name, cost } = this.state;
    if (!service_name || !cost) return;
    let res = await saveServiceToBackend(this.props.token, {
      service_name: service_name,
      cost: cost,
    });
    if (res.success) {
      this.setState({ loading: false });
      this.props.handleShow();
      this.props.saveDashboardData();
    }
  };

  saveServiceEdit = async () => {
    this.setState({ loading: true });
    const { service_name, cost } = this.state;
    if (!service_name || !cost) return;
    let res = await saveServiceEditToBackend(
      this.props.token,
      {
        service_name: service_name,
        cost: cost,
      },
      this.state.id
    );
    if (res && res.success) {
      this.setState({ loading: false });
      this.props.handleShow();
      this.props.saveDashboardData();
    }
  };

  componentDidMount() {
    let { toEdit, editMode } = this.props;
    console.log(toEdit, editMode);
    if (editMode) {
      this.setState({
        service_name: toEdit.service_name,
        cost: toEdit.cost,
        id:toEdit.id
      });
    } else {
      this.setState({
        service_name: "",
        cost: "",
      });
    }
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Service Creation Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.sendEmailForPasswordReset}>
            <Form.Group>
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Service Name"
                value={this.state.service_name}
                onChange={(e) =>
                  this.setState({ service_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Service Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.0"
                value={this.state.cost}
                onChange={(e) => this.setState({ cost: e.target.value })}
              />
            </Form.Group>
          </Form>
          <div>
            {this.state.loading ? <LinearProgress color="secondary" /> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!this.props.toEdit.service_name ? (
            <Button
              className="button"
              variant="primary"
              onClick={this.saveService}
            >
              SAVE
            </Button>
          ) : (
            <Button
              className="button"
              variant="primary"
              onClick={this.saveServiceEdit}
            >
              SAVE Edit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ServiceForm));
