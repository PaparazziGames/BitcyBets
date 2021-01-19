import React, {Component} from 'react';
import Chart from "chart.js";
import {connect} from "react-redux";
import {bitcoinCourse} from "../redux/actions";
import bull from '../images/bull_tooltip.svg';
import bear from '../images/bear_tooltip.svg';

let socket = new WebSocket("wss://bitcybets.com:8000/serv");
let exam;
let graph = (course, ctx, color) => (exam = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [{
            label: '',
            backgroundColor: color,
            borderColor: '#FFFFFF',//'#8DD9FC',
            borderWidth: '1',
            data: course,
            pointHitRadius: 10
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
        tooltips: {
            // Disable the on-canvas tooltip
            enabled: false,

            custom: function (tooltipModel) {
                // Tooltip Element
                var tooltipEl = document.getElementById('chartjs-tooltip');

                // Create element on first render
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<table></table>';
                    document.body.appendChild(tooltipEl);
                }

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = 0;
                    return;
                }

                // Set caret Position
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }
                //Value
                function getBody(bodyItem) {
                    return bodyItem.lines;
                }

                // Set Text
                var currentHover = '';
                var item = '';
                var index = '';
                var courseDirection = false;

                if (tooltipModel.body) {
                    var titleLines = tooltipModel.title || [];
                    var bodyLines = tooltipModel.body.map(getBody);

                    var innerHtml = '<thead>';

                    titleLines.forEach(function (title) {

                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });

                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function (body, i) {
                        currentHover = body;
                        item =course.filter((item, i) => +item === +currentHover) + '';
                        index = course.indexOf(item);
                        courseDirection = course[index] - course[index - 1] < 0;
                        const icon = !courseDirection ? bull : bear;
                        var colors = tooltipModel.labelColors[i];
                        var style = 'background:' + colors.backgroundColor;
                        style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        if(courseDirection) {
                            innerHtml += '<tr><td>' + span + body.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '<img style="margin-left: 5px; margin-right: -5px;" alt="logo" src="' + icon + '" /></td></tr>';
                        } else {
                            innerHtml += '<tr><td>' + span + '<img alt="logo" style="margin-right: 5px;" src="' + icon + '" />'  + body.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</td></tr>';
                        }
                    });
                    innerHtml += '</tbody>';

                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall tooltip
                var position = this._chart.canvas.getBoundingClientRect();
                // Display, position, and set styles for font
                const offset = index > 12 ? 125 : 0;
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - offset + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.fontFamily = "roc-grotesk";
                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.zIndex = 10;
                tooltipEl.style.border = courseDirection ? '1px solid #FF453A' : '1px solid #32D74B';
                tooltipEl.style.borderRadius = '36px';
                tooltipEl.style.padding = '8px';
                tooltipEl.style.backgroundColor = '#1A1F34';
            }
        }
    }
}))

class Graph extends Component {

    componentDidMount() {
        if (socket.readyState !== 1) {
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
            // sliceData.map(item => console.log(item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")))
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
            <canvas height="265" id="myChart"/>
        )
    }
}

const mapStateToProps = state => ({course: state.courseReducer.course});
const mapDispatchToProps = {bitcoinCourse};
export default connect(mapStateToProps, mapDispatchToProps)(Graph);

