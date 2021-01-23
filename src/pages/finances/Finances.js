import React, { Component } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import { Months } from "../../machinery/Konstants";
import "../../css/reports.css";
import Report from "./ReportDetail";
import { getReportFromBackend } from "../../machinery/functions/IneractionFunctions";
import { connect } from "react-redux";

class Finances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showReport: false,
      type: "",
      year: "",
      month: "",
      error: "",
      data: {},
    };
  }

  handleFetchReport = async () => {
    const { type, year, month } = this.state;

    if (!type || !year)
      return this.setState({
        error: "Please make Sure you populate input field.",
      });
    this.setState({ error: "", loading: true });

    let res = await getReportFromBackend(
      {
        type: this.state.type,
        year: this.state.year,
        month: this.state.month,
      },
      this.props.token
    );
    if (res && !res.error && res.period_earnings) {
      this.setState({ loading: false, data: res }, () =>
        this.setState({ showReport: true })
      );
    } else {
      this.setState({
        loading: false,
        error:
          "We are unable to generate report due to invalid data provided. Please corect the parameter and try again.",
      });
    }
  };

  showFilterFields = () => {
    if (this.state.type === "YEARLY") {
      return (
        <Form.Group className="space-top">
          <Form.Control
            type="text"
            placeholder="Enter year"
            value={this.state.year}
            onChange={(e) => this.setState({ year: e.target.value })}
          />
        </Form.Group>
      );
    } else if (this.state.type === "MONTHLY") {
      return (
        <Form.Row className="space-top">
          <Col>
            <Form.Control
              placeholder="Enter Year"
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
            />
          </Col>
          <Col>
            <Form.Control
              as="select"
              onChange={(e) => this.setState({ month: e.target.value })}
            >
              <option>Select Month</option>
              {Months.map((month, index) => {
                return (
                  <option value={index + 1} key={index}>
                    {month}
                  </option>
                );
              })}
            </Form.Control>
          </Col>
        </Form.Row>
      );
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        {/* filter  div*/}
        <div className="z-depth-1 card-me" id="report-main-container">
          <div id="report-type">
            {error ? <p id="error-text">{error}</p> : null}
            <Form.Group>
              <Form.Label>REPORT TYPE</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => this.setState({ type: e.target.value })}
              >
                <option>Select Type Report</option>
                <option value="MONTHLY">Monthly Report</option>
                <option value="YEARLY">Yearly Report</option>
              </Form.Control>
            </Form.Group>
          </div>
          {this.showFilterFields()}
          <div id="btn-container">
            {this.state.loading ? (
              <center>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </center>
            ) : (
              <center>
                <Button
                  className="button"
                  variant="primary"
                  id="get-report-btn"
                  onClick={this.handleFetchReport}
                >
                  Get Report
                </Button>
              </center>
            )}
          </div>
        </div>

        {/* display report */}
        {this.state.showReport ? <Report data={this.state.data} year={this.state.year}  month={this.state.month} /> : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};
export default connect(mapStateToProps, null)(Finances);
