import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { saveRoomToBackend,saveRoomEditToBackend } from "../../machinery/functions/IneractionFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import { storage } from "../../machinery/firebase";
import LinearProgress from "@material-ui/core/LinearProgress";

class RoomForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      number_of_beds: "",
      bed_size: "",
      cost: "",
      image: "",
      loading: false,
      editMode: false,
      id: "",
    };
  }
  uploadImage = async (image) => {
    const uploadTask = await storage.ref(`rooms/${image.name}`).put(image);
    return await uploadTask.ref.getDownloadURL();
  };
  saveRoom = async () => {
    this.setState({ loading: true });
    const { name, type, number_of_beds, bed_size, cost, image } = this.state;
    if (!image) return;
    let url = await this.uploadImage(image);
    if (url) {
      let res = await saveRoomToBackend(this.props.token, {
        name: name,
        number_of_beds: number_of_beds,
        type: type,
        bed_size: bed_size,
        image: url,
        cost: cost,
      });
      if (res.success) {
        this.setState({ loading: false });
        this.props.handleShow();
        this.props.saveDashboardData();
      }
    }
  };
  componentWillReceiveProps({ editMode, toEdit }) {
    console.log(toEdit, editMode);
    this.setState({
      editMode: editMode,
      id: toEdit.id,
      name: toEdit.name,
      type: toEdit.type,
      number_of_beds: toEdit.number_of_beds,
      bed_size: toEdit.bed_size,
      cost: toEdit.cost,
    });
  }

  componentDidMount() {
    let { toEdit, editMode } = this.props;
    console.log(toEdit, editMode);
    if (editMode) {
      this.setState({
        id: toEdit.id,
        name: toEdit.name,
        type: toEdit.type,
        number_of_beds: toEdit.number_of_beds,
        bed_size: toEdit.bed_size,
        cost: toEdit.cost,
      });
    } else {
      this.setState({
        name: "",
        type: "",
        number_of_beds: "",
        bed_size: "",
        cost: "",
        image: "",
        id: "",
      });
    }
  }

  saveRoomEdit = async () => {
    this.setState({ loading: true });
    const { name, type, number_of_beds, bed_size, cost, image } = this.state;
    if (image) {
      let url = await this.uploadImage(image);
      if (url) {
        let res = await saveRoomEditToBackend(
          this.props.token,
          {
            name: name,
            number_of_beds: number_of_beds,
            type: type,
            bed_size: bed_size,
            image: url,
            cost: cost,
          },
          this.state.id
        );
        if (res.success) {
          this.setState({ loading: false });
          this.props.handleShow();
          this.props.saveDashboardData();
        }
      } 
    }
    else {
      let res = await saveRoomEditToBackend(
        this.props.token,
        {
          name: name,
          number_of_beds: number_of_beds,
          type: type,
          bed_size: bed_size,
          cost: cost,
        },
        this.state.id
      );
      if (res.success) {
        this.setState({ loading: false });
        this.props.handleShow();
        this.props.saveDashboardData();
      }
    }
  };
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
            Room Creation Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.sendEmailForPasswordReset}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name of room"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.type}
                    placeholder="Enter Room Type"
                    onChange={(e) => this.setState({ type: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Room Cost</Form.Label>
                  <Form.Control
                    autoFocus
                    type="number"
                    value={this.state.cost}
                    onChange={(e) => this.setState({ cost: e.target.value })}
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Number of beds</Form.Label>
                  <Form.Control
                    autoFocus
                    type="number"
                    value={this.state.number_of_beds}
                    onChange={(e) =>
                      this.setState({ number_of_beds: e.target.value })
                    }
                    placeholder="0"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Bed Size</Form.Label>
                  <Form.Control
                    placeholder="0"
                    autoFocus
                    type="number"
                    value={this.state.bed_size}
                    onChange={(e) =>
                      this.setState({ bed_size: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Room Image</Form.Label>
              <Form.Control
                autoFocus
                type="file"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </Form.Group>
          </Form>
          <div>
            {this.state.loading ? <LinearProgress color="secondary" /> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!this.props.toEdit.name ? (
            <Button
              className="button"
              variant="primary"
              onClick={this.saveRoom}
            >
              SAVE
            </Button>
          ) : (
            <Button
              className="button"
              variant="primary"
              onClick={this.saveRoomEdit}
            >
              SAVE EDIT
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
)(withRouter(RoomForm));
