import React, {Component} from 'react';
import Chart from "chart.js";

class Graph extends Component {
    componentDidMount() {
        // const ctx = this.ctx;
        const ctx = document.getElementById('myChart').getContext('2d');
        const my_gradient = ctx.createLinearGradient(0, 100, 0, 400);
        my_gradient.addColorStop(0, "rgba(141,217,252,0.7)");
        my_gradient.addColorStop(1, "transparent");
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                datasets: [{
                    label: 'Bitcoin Live price',
                    backgroundColor: my_gradient,
                    borderColor: '#FFFFFF',
                    borderWidth: '1',
                    data: [23556, 23555, 23558, 23559, 23560, 23559, 23556, 23557, 23558, 23559, 23562, 23561, 23556, 23556, 23558, 23559, 23560, 23561]
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

    render() {

        return (
            <canvas id="myChart" width='400' height='300'/>
        )
    }
}

export default Graph;
