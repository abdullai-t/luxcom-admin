import React from 'react';
import {Pie} from 'react-chartjs-2';


export default class PaidVsUnpaid extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            ratio:[]
        }
        
    }
    
    componentWillReceiveProps({ ratio }) {
        this.setState({ ratio: ratio });
      }
      componentDidMount() {
        let ratio = this.props.ratio;
        this.setState({ ratio: ratio });
      }
  render() {
    return (
      <div>
        <Pie
          data={{
            labels: ['PAID', 'UNPAID'],
            datasets: [
              {
                label: 'Payment Ratio',
                backgroundColor: [
                  '#52BE80',
                  '#EDBB99'
                ],
                hoverBackgroundColor: [
                '#1E8449',
                '#D35400'
                ],
                data: this.state.ratio
              }
            ]
          }}
          options={{
            title:{
              display:true,
              text:'Ratio of Paid to Unpaid Reservations',
              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom'
            }
          }}
        />
      </div>
    );
  }
}