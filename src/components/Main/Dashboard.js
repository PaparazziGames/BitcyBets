import React from 'react';
import bitcoin from "../../images/bitcoin.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";
import {betLose, betWin, closeCongratulation} from "../../redux/actions";
import {bell, click, tic, fireworks} from "../../redux/actions/music";
import Rates from "./Rates";
import {predictDown, predictUp} from "../../redux/actions/game";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bet: .001, predict: false, counter: 10, rate: '', initialOffset: 440};
        this.setBet = this.setBet.bind(this);
        this.predictSubmit = this.predictSubmit.bind(this);
        this.setRate = this.setRate.bind(this);
    }

    setBet(e) {
        let bet = +e.target.value.slice(0, 5);
        if (!bet) {
            bet = 0.001;
        }
        if (bet > 1) {
            bet = 1;
        }
        this.setState((state) => ({...state, ...{bet: bet ? bet : 0.001}}));
    }

    setRate(rate) {
        this.setState((state) => ({...state, rate: rate}));
    }

    predictSubmit(e) {
        // e.preventDefault();
        const timer = setInterval(() => {
            this.setState((state) => ({...state, counter: state.counter - 1}));
            this.props.tic();
        }, 1000)
        this.setState((state) => ({...state, predict: true}));
        return setTimeout(() => {
            clearInterval(timer);
            this.setState((state) => ({...state, predict: false, counter: 10}));
            let currentCourse = this.props.currentCourse;
            let lastCourse = this.props.course[this.props.course.length - 1];
            let bet = this.state.bet;
            if (currentCourse > lastCourse) {
                this.state.rate === 'up' ? this.props.betWin(bet) : this.props.betLose(bet);
            } else if (currentCourse < lastCourse) {
                this.state.rate === 'down' ? this.props.betWin(bet) : this.props.betLose(bet);
            }
            if (this.props.congratulation) {
                this.props.bell();
                setTimeout(() => this.props.fireworks(), 300);
            }
            this.setRate('');

        }, 10000)
    }

    render() {
        const {bet, predict, counter, rate, initialOffset} = this.state;
        const {balance, click, predictDown, predictUp, currentTime} = this.props;
        const time = 10;
        const i = 10 - counter || 1;
        const newBet = /*arrBet.length === 2 ? bet + '00' : arrBet.length === 3 ? bet + '0' : arrBet.length === 1 ? bet + '.000' :*/ bet;
        const currentTimeSec = currentTime ? +currentTime.substr(6) : 0;
        let timeBet = false;
        let startGame = false;
        // const trueArray = [0, 5, 20, 25, 40, 45];
        if(currentTimeSec) {
            timeBet = !(currentTimeSec === 0 || currentTimeSec === 5 || currentTimeSec === 20 || currentTimeSec === 25 || currentTimeSec === 40 || currentTimeSec === 45);
            startGame = currentTimeSec === 10 || currentTimeSec === 30 || currentTimeSec === 50;

        }
        return (
            <div className="row bottom-container">
                <Rates/>
                <div className="round dashboard">
                    <div className="range">
                        <div className="form-label d-flex justify-content-between">
                            <div>
                                <h2 className="text-left">Make your bet</h2>
                                <span>Set bet size</span>
                            </div>
                            <div>
                                <span className={balance - bet >= 0 ? '' : 'red'}>
                                <input id="numberBet" type="number" step="0.001" min="0.001" max="1"
                                       className={balance - bet >= 0 ? '' : 'red'}
                                       disabled={predict || timeBet}
                                       onInput={this.setBet}
                                       value={newBet}/>
                                <img className="numberBet" width="15" src={bitcoin} alt="up"/>
                            </span>
                            </div>
                        </div>
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="form">
                                <div className="bet">
                                    <input min="0.001" max="1" step="0.001"
                                           type="range"
                                           disabled={predict || timeBet}
                                           value={newBet}
                                           style={{backgroundImage: `linear-gradient(to right, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} 0%, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} ${bet * 100}%, #fff ${bet * 100}%, white 100%)`}}
                                           onChange={this.setBet}
                                           className={balance - bet >= 0 ? 'green-range' : 'red-range'}
                                           id="range"/>
                                </div>
                                <div className='wrap-btn'>
                                    <div style={{display: rate === 'up' || !rate ? 'block' : 'none'}} className="up">
                                        <div className="profit">
                                            <span className="green">Your profit</span>
                                            <span>0.85</span>
                                            <img src={bitcoin} width="15" height="20" alt="b"/>
                                        </div>
                                        <button disabled={predict || balance - bet < 0 || timeBet} onClick={(e) => {
                                            e.preventDefault();
                                            this.predictSubmit();
                                            this.setRate('up');
                                            click();
                                            predictUp({value: bet.toString()});
                                        }}
                                                className="btn green predict-btn">PREDICT UP
                                            <img src={arrowUp} width="15" height="20" alt="b"/>
                                        </button>
                                    </div>
                                    <p style={{display: predict && rate === 'up' && timeBet ? 'flex' : 'none', margin: '0 59px'}}
                                       id="predict"
                                       className="btn bet-btn col-sm-4">
                                        <span className="gold">{counter}
                                            <span className='circle'>
                                                <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <title>Layer 1</title>
                                                    <circle
                                                        strokeDasharray={440}
                                                        strokeDashoffset={counter === 10 ? -2 * initialOffset : ((i + 1) * (initialOffset / time)) - 2 * initialOffset}
                                                        id="circle" className="circle_animation" r="69.85699" cy="81"
                                                        cx="81" strokeWidth="6"
                                                        stroke="#F7931A" fill="none"/>
                                                </g>
                                            </svg>
                                            </span>
                                        </span>

                                    </p>
                                    <p style={{display: predict && rate === 'down' && timeBet ? 'flex' : 'none', margin: '0 59px'}}
                                       id="predict"
                                       className="btn bet-btn col-sm-4">
                                        <span className="gold">{counter}
                                            <span className='circle'>
                                                <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                                                <g>
                                                    <title>Layer 1</title>
                                                    <circle
                                                        strokeDasharray={440}
                                                        strokeDashoffset={counter === 10 ? -2 * initialOffset : ((i + 1) * (initialOffset / time)) - 2 * initialOffset}
                                                        id="circle" className="circle_animation" r="69.85699" cy="81"
                                                        cx="81" strokeWidth="6"
                                                        stroke="#F7931A" fill="none"/>
                                                </g>
                                            </svg>
                                            </span>
                                        </span>
                                    </p>
                                    <div style={{display: rate === 'down' || !rate ? 'block' : 'none'}}
                                         className="down">
                                        <div className="profit">
                                            <span className="red">Your profit</span>
                                            <span>0.85</span>
                                            <img src={bitcoin} width="15" height="20" alt="b"/>
                                        </div>
                                        <button disabled={predict || balance - bet < 0 || timeBet} onClick={(e) => {
                                            e.preventDefault();
                                            this.predictSubmit();
                                            this.setRate('down');
                                            predictDown({value: bet.toString()});
                                            click();
                                        }}
                                                className="btn red predict-btn">PREDICT DOWN
                                            <img src={arrowDown} width="15" height="20" alt="b"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        balance: state.balanceReducer.balance,
        congratulation: state.balanceReducer.congratulation,
        course: state.courseReducer.course,
        currentCourse: state.courseReducer.currentCourse,
        currentTime: state.courseReducer.currentTime,
        lastWin: state.balanceReducer.lastWin
    }
}
const mapDispatchToProps = {
    betWin,
    betLose,
    click,
    tic,
    bell,
    fireworks,
    closeCongratulation,
    predictUp,
    predictDown
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
