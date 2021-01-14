import React, {Component} from 'react';
import Chart from "chart.js";
import {connect} from "react-redux";
import {bitcoinCourse} from "../redux/actions";

let socket = new WebSocket("wss://bitcybets.com:8000/serv");
let exam;
let graph = (course, ctx, color) => (exam = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: 'Bitcoin Live price',
            backgroundColor: color,
            borderColor: '#FFFFFF',//'#8DD9FC',
            borderWidth: '1',
            data: course,
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
                    stepSize: 20,
                    fontFamily: "roc-grotesk"
                    // beginAtZero: true
                },
                gridLines: {
                    color: "rgba(255, 255, 255, 0.1)"
                }
            }],
            xAxes: [{
                ticks: {
                    stepSize: 0.5,
                    fontFamily: "roc-grotesk"
                },
                gridLines: {
                    color: "rgba(255, 255, 255, 0.1)"
                }
            }]
        },
    }
}))

class Graph extends Component {

    componentDidMount() {
        if(socket.readyState === 2) {
            socket = new WebSocket("wss://bitcybets.com:8000/serv");
        }
        socket.onmessage = e => {
            let ctx = document.getElementById('myChart').getContext('2d');
            const my_gradient = ctx.createLinearGradient(0, 100, 0, 400);
            my_gradient.addColorStop(0, "rgba(141,217,252,0.6)");
            my_gradient.addColorStop(1, "transparent");
            let msg = e.data.slice(1, -1);
            let data = msg.split(',');
            let sliceData = data.slice(-17);
            this.props.bitcoinCourse(sliceData);
            if (exam) {
                if (exam.config.data.datasets[0].data.length > 0) {
                    exam.config.data.datasets[0].data.splice(0, 1);
                    exam.config.data.datasets[0].data.push(data.pop());
                    exam.update();
                } else {
                    graph(sliceData, ctx, my_gradient)
                }
            } else {
                graph(sliceData, ctx, my_gradient)
            }
        }
    }

    componentWillUnmount() {
        socket.close();
        this.props.bitcoinCourse([]);
        exam = '';
    }

    render() {

        return (
            <canvas id="myChart"/>
        )
    }
}

const mapStateToProps = state => ({course: state.courseReducer.course});
const mapDispatchToProps = {bitcoinCourse};
export default connect(mapStateToProps, mapDispatchToProps)(Graph);
