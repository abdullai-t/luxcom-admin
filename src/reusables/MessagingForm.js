import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import { sendGenericMessage } from "../machinery/functions/IneractionFunctions";

class MessagingForm extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      message: "",
      error: "",
      subject: "",
      receiver: "",
      error: "",
      type:""
    };
  }

  componentDidMount() {
    const receiver = this.props.receiver;
    this.setState({ receiver: receiver, type:this.props.type });
  }
  componentWillReceiveProps({ receiver, type }) {
    this.setState({ receiver: receiver, type:type });
  }

  sendMessage = async(e) => {
    const { error, message, subject, receiver } = this.state;
    if (!message) return this.setState({ error: "please type in a message" });
    this.setState({ error: "", loading: true });

    let res = await sendGenericMessage(this.props.token, {
        messageType:this.state.type,
        receiver:receiver,
        message:message,
        subject:subject
    })

    if(res && res.success){
        this.setState({loading:false})
        this.props.handleShow()
    }
    else{
        this.setState({loading:false, error:"unable to send Message"})
    }
  };
  render() {
    const { error, message, subject, receiver } = this.state;
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
          <Form id="form">
            {error ? <p id="error-text">{error}</p> : null}

            <Form.Group>
              <Form.Label>Reciepient</Form.Label>
              <Form.Control type="text" value={receiver} disabled />
            </Form.Group>

            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                onChange={(e) => this.setState({ subject: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                id="contact-form-field"
                value={message}
                onChange={(e) => this.setState({ message: e.target.value })}
                placeholder="Enter Your Message......"
                rows={5}
              />
            </Form.Group>
          </Form>
          {this.state.loading ? <LinearProgress color="secondary" /> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button"
            variant="primary"
            onClick={this.sendMessage}
          >
            send Message
          </Button>
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
export default connect(mapStateToProps, null)(MessagingForm);
