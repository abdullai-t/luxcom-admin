import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  adminAddReservation,
  sendGenericMessage,
} from "../../machinery/functions/IneractionFunctions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashboardDataAction } from "../../machinery/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { encode } from "base-64";

class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: 1,
      children: 0,
      loading: false,
      username: "",
      email: "",
      phone: "",
      checkin: "",
      checkout: "",
      room: "",
    };
  }

  addReservation = async (e) => {
    const room = JSON.parse(this.state.room);
    this.setState({ loading: true });
    let bill = {
      reservationObj: {
        check_in_date: this.state.checkin,
        check_out_date: this.state.checkout,
        number_of_adult: this.state.adults,
        number_of_children: this.state.children,
        room: room.id,
        cost: room.cost,
      },
      email: this.state.email,
      fname: this.state.username,
      username: this.state.username,
      phone: this.state.phone,
      total_cost: room.cost,
      payment_mode: "",
      is_admin_create: true,
    };

    const res = await adminAddReservation(bill, this.props.token);
    if (res && res.reservationID) {
      this.setState({ loading: false }, () => this.props.saveDashboardData());
      sendGenericMessage(this.props.token, {
        messageType: "EMAIL",
        receiver: [this.state.email],
        message: `HI, \n\n visit the link below to make payment for your reservation. \n\n
        https://luxcom-hotel.web.app/self-pay/${encode(room.cost)}/${encode(
          this.state.email
        )}/${encode(res.reservationID)}/${encode(res.token)}}`,
        subject: "Reservation Payment",
      });
      this.props.handleShow();
    }
  };

  render() {
    return (
      <>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Booking Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      placeholder="Enter client name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter client email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                      placeholder="Enter client phone number"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select room</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => this.setState({ room: e.target.value })}
                    >
                      <option>select room</option>
                      {this.props.rooms && this.props.rooms.length ? (
                        this.props.rooms.map((room, index) => {
                          return (
                            <option
                              key={index.toString()}
                              value={JSON.stringify(room)}
                            >
                              {room
                                ? room.name +
                                  " -- " +
                                  " ( GHS " +
                                  room.cost +
                                  ")"
                                : " "}
                            </option>
                          );
                        })
                      ) : (
                        <option>No room Available</option>
                      )}
                    </Form.Control>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Check in</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Checkin date"
                          onChange={(e) =>
                            this.setState({ checkin: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Check out</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Check out date"
                          onChange={(e) =>
                            this.setState({ checkout: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Adults</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Number of Adults"
                          value={this.state.adults}
                          onChange={(e) =>
                            this.setState({ adults: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Children</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Number of children"
                          value={this.state.children}
                          onChange={(e) =>
                            this.setState({ children: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>

            <div>
              {this.state.loading ? <LinearProgress color="secondary" /> : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button"
              variant="primary"
              onClick={this.addReservation}
            >
              Add Reservation
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    rooms: state.dashboard.rooms,
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
)(withRouter(ReservationForm));
