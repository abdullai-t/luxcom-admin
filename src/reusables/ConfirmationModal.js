import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
export default class ConfirmationModal extends Component {
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
            Messaging Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete this table ?? !
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.props.handleShow}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>this.props.delete()}>
            delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
