import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class NumberOfMontlyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  genDataArray = (data)=>{
      const GraphDataArray = []
      data.map(datum=> GraphDataArray.push(datum.count))
      return GraphDataArray;
  }

  componentWillReceiveProps({ data }) {
    this.setState({ data: this.genDataArray(data) });
  }
  componentDidMount() {
    let data = this.genDataArray(this.props.data ? this.props.data :[]);
    this.setState({ data: data });
  }
  render() {
    return (
      <div>
        <Bar
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "June",
              "July",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Reservations",
                backgroundColor: "#5499C7",
                borderColor: "#2E86C1",
                borderWidth: 2,
                data: this.state.data,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: "Reservations Per Month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.dashboard.monthly_bookings,
  };
};

export default connect(mapStateToProps, null)(NumberOfMontlyBooking);
