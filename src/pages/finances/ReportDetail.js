import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";

class ReportDetail extends Component {
  render() {
    return (
      <div
        className="z-depth-1"
        style={{ marginTop: "2rem" }}
        id="report-main-container"
      >
        <center>
          <h2 style={{ color: "grey", fontSize: "1.8rem" }}>
            REPORT STATEMENT
          </h2>
        </center>
        <div style={{ marginTop: "2rem" }}>
          <span style={{ color: "grey", fontSize: "1.5rem" }}>
            LUXCOM HOTEL
          </span>
          <p style={{ color: "grey", fontSize: "0.9rem" }}>
            <span>{this.props.month} {"  "} {this.props.year}</span> Report{" "}
          </p>
        </div>

        <div style={{ marginTop: "2.3rem" }}>
          <div style={{ padding: "4px 2px", backgroundColor: "#5DADE2" }}>
            <span style={{ fontSize: "1.1rem", color: "white" }}>
              REPORT DETAIL
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
              marginTop: "2rem",
            }}
          >
            <p>Number of Paid Reservations</p>
            <p>{this.props.data.paid}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
            }}
          >
            <p>Number of Unpaid Reservations</p>
            <p>{this.props.data.unpaid}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
            }}
          >
            <p>Number of Reservations</p>
            <p>{this.props.data.paid + this.props.data.unpaid}</p>
          </div>
          <hr
            style={{
              width: "90%",
              margin: "auto",
              color: "grey",
              marginBottom: "1rem",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
            }}
          >
            <p>Earnings for Period</p>
            <p>GHS {this.props.data.period_earnings}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              margin: "auto",
            }}
          >
            <p>Total Earnings</p>
            <p>GHS {this.props.data.total_earning}</p>
          </div>
        </div>
      </div>
    );
  }
}

class Report extends React.Component {
  render() {
    return (
      <div>
        <ReportDetail
          ref={(el) => (this.componentRef = el)}
          data={this.props.data}
          year={this.props.year}
          month={this.props.month}
        />
        <ReactToPrint
          trigger={() => {
            return (
              <center style={{ marginTop: "2rem" }}>
                <Button
                  className="button"
                  variant="primary"
                  id="get-report-btn"
                >
                  Print as PDF
                </Button>
              </center>
            );
          }}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default Report;
