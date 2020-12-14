import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class StaffForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
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
            Password Reset Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.sendEmailForPasswordReset}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button"
            variant="primary"
            onClick={this.sendEmailForPasswordReset}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(StaffForm)