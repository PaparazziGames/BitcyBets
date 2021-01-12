import React, {Component} from 'react';
import Chart from "chart.js";
import {connect} from "react-redux";
import {bitcoinCourse} from "../redux/actions";

let socket = new WebSocket("wss://bitcybets.com:8000/serv");
let exam;
let graph = (course, ctx, color) => (exam = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        datasets: [{
            label: 'Bitcoin Live price',
            backgroundColor: color,
            borderColor: '#FFFFFF',
            borderWidth: '1',
            data: course
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
        aspectRatio: .9,
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 12,
                    // stepSize: false,
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
}))

class Graph extends Component {

    componentDidMount() {
        socket.onmessage = e => {

            let ctx = document.getElementById('myChart').getContext('2d');
            const my_gradient = ctx.createLinearGradient(0, 100, 0, 400);
            my_gradient.addColorStop(0, "rgba(141,217,252,0.6)");
            my_gradient.addColorStop(1, "transparent");

            let data = e.data.slice(1, -1).split(',');
            this.props.bitcoinCourse(data);

            if (exam) {

                if (exam.config.data.datasets[0].data.length > 0) {
                    if(exam.config.data.datasets[0].data.length === 40) {
                        exam.config.data.datasets[0].data.splice(0, 1);
                    }
                    exam.config.data.datasets[0].data.push(data.pop());
                    exam.update();
                } else {
                    graph(data, ctx, my_gradient)
                }
            } else {
                graph(data, ctx, my_gradient)
            }
        }
    }

    componentWillUnmount() {
        socket.close();
    }

    render() {

        return (
            <canvas id="myChart"/>
        )
    }
}

const
    mapStateToProps = state => {
        return {
            course: state.courseReducer.course
        }
    }
const
    mapDispatchToProps = {
        bitcoinCourse
    }

export default connect(mapStateToProps, mapDispatchToProps)

(
    Graph
)
;
