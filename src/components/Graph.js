import React, {Component} from 'react';
import Chart from "chart.js";
import {connect} from "react-redux";
import {bitcoinCourse} from "../redux/actions";

let socket = new WebSocket("wss://bitcybets.com:8000/serv");

class Graph extends Component {
    componentDidMount() {
        socket.onmessage = e => {
            let data = e.data.slice(1, -1).split(',');
            this.props.bitcoinCourse(data);
            const ctx = document.getElementById('myChart').getContext('2d');
            const my_gradient = ctx.createLinearGradient(0, 100, 0, 400);
            my_gradient.addColorStop(0, "rgba(141,217,252,0.7)");
            my_gradient.addColorStop(1, "transparent");
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                    datasets: [{
                        label: 'Bitcoin Live price',
                        backgroundColor: my_gradient,
                        borderColor: '#FFFFFF',
                        borderWidth: '1',
                        data: this.props.course
                    }]
                },
                options: {
                    legend: {
                        display: false,
                        labels: {
                            fontColor: "transparent",
                            border: 'none',
                            fontSize: 0
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "white",
                                fontSize: 18,
                                // stepSize: 1,
                                // beginAtZero: true
                            },
                            gridLines: {
                                color: "rgba(255, 255, 255, 0.5)"
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                color: "rgba(255, 255, 255, 0.5)"
                            }
                        }]
                    },
                }
            });
        }
    }
    componentWillUnmount() {
        socket.close();
    }
    render() {

        return (
            <canvas id="myChart" width='400' height='300'/>
        )
    }
}
const mapStateToProps = state => {
    return {
        course: state.courseReducer.course
    }
}
const mapDispatchToProps = {
    bitcoinCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
