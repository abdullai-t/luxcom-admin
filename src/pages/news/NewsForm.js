import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { addNewNews,saveEditANews } from "../../machinery/functions/IneractionFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import { storage } from "../../machinery/firebase";
import LinearProgress from "@material-ui/core/LinearProgress";

class NewsForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      image: "",
      loading: false,
      editMode: false,
      id: "",
      error:""
    };
  }
  uploadImage = async (image) => {
    const uploadTask = await storage.ref(`news/${image.name}`).put(image);
    return await uploadTask.ref.getDownloadURL();
  };

  saveRoom = async () => {
    const { title, content, image } = this.state;
    if (!image) return this.setState({error:"please provide image"});
    this.setState({error:"",loading: true})
    let url = await this.uploadImage(image);
    if (url) {
      let res = await addNewNews(this.props.token, {
        title: title,
        content: content,
        image: url,
      });
      if (res && res.success) {
        this.setState({ loading: false });
        this.props.handleShow();
        this.props.saveDashboardData();
      }
      else{
        this.setState({ loading: false, error:"Unable to perform this request. Please check the form" });
      }
    }
  };
  componentWillReceiveProps({ editMode, toEdit }) {
    console.log(toEdit, editMode);
    this.setState({
      editMode: editMode,
      id: toEdit.id,
      title: toEdit.title,
      content: toEdit.content,
    });
  }

  componentDidMount() {
    let { toEdit, editMode } = this.props;
    console.log(toEdit, editMode);
    if (editMode) {
      this.setState({
        id: toEdit.id,
        title: toEdit.title,
        content: toEdit.content,
      });
    } else {
      this.setState({
        title: "",
        content: "",
        image: "",
        id: "",
      });
    }
  }

  saveRoomEdit = async () => {
    this.setState({ loading: true });
    const { title, content, image } = this.state;
    if (image) {
      let url = await this.uploadImage(image);
      if (url) {
        let res = await saveEditANews(
          this.props.token,
          {
            title: title,
            content: content,
            image: url,
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
      let res = await saveEditANews(
        this.props.token,
        {
            title: title,
            content: content,
        },
        this.state.id
      );
      if (res && res.success) {
        this.setState({ loading: false });
        this.props.handleShow();
        this.props.saveDashboardData();
      }
      else{
        this.setState({ loading: false, error:"Unable to perform this request. Please check the form" });
      }
    }
  };
  render() {
      const {error} = this.state
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            News Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {error ? <p id="error-text">{error}</p> : null}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter news title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                autoFocus
                type="file"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </Form.Group>
            <Form.Group>
                  <Form.Control
                    as="textarea"
                    id="contact-form-field"
                    value={this.state.content}
                    onChange={(e) => this.setState({ content: e.target.value })}
                    placeholder="Enter news conent......"
                    rows={5}
                  />
                </Form.Group>
          </Form>
          <div>
            {this.state.loading ? <LinearProgress color="secondary" /> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!this.props.toEdit.title ? (
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
)(withRouter(NewsForm));
