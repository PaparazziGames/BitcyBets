import React from 'react';
import up from "../../images/up.svg";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import down from "../../images/down.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";
import {betLose, betWin, closeCongratulation} from "../../redux/actions";
import {bell, click, tic, fireworks} from "../../redux/actions/music";
import Rates from "./Rates";
import Circle from "./Circle";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bet: .5, predict: false, counter: 10, rate: ''};
        this.setBet = this.setBet.bind(this);
        this.predictSubmit = this.predictSubmit.bind(this);
        this.setRate = this.setRate.bind(this);
    }

    setBet(e) {
        this.setState((state) => ({...state, ...{bet: e.target.value}}));
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
        const {bet, predict, counter, rate} = this.state;
        const {balance, click} = this.props;

        const arrBet = bet.toString().split('.');
        const newBet = arrBet.length === 2 ? bet + '00' : arrBet.length === 3 ? bet + '0' : arrBet.length === 1 ? bet + '.000' : bet;
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
                                <span>
                                <input id="numberBet" type="number" step="0.001" min="0.001" max="1"
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
                                           disabled={predict}
                                           style={{backgroundImage: `linear-gradient(to right, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} 0%, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} ${bet * 100}%, #fff ${bet * 100}%, white 100%)`}}
                                           onInput={this.setBet}
                                           className={balance - bet >= 0 ? 'green-range' : 'red-range'}
                                           id="range"/>
                                </div>
                                {/*{balance - bet >= 0*/}
                                {/*    ? <></>*/}
                                {/*    : <>*/}

                                {/*        <div className='wrap-btn'>*/}
                                {/*            <p className="btn bet-btn"><span>Not enough</span></p>*/}
                                {/*            <Link to='/refill' className="btn refill-btn"><span>Refill</span>*/}
                                {/*                <img src={bitcoin} width="15" height="20" alt="b"/>*/}
                                {/*            </Link>*/}

                                {/*        </div>*/}
                                {/*    </>}*/}

                                {/*{balance - bet >= 0*/}
                                {/*    ? <>*/}

                                <div className='wrap-btn'>


                                    <div style={{display: rate === 'up' || !rate ? 'block' : 'none'}} className="up">
                                        <div className="profit">
                                            <span className="green">Your ptofit</span>
                                            <span>0.85</span>
                                            <img src={bitcoin} width="15" height="20" alt="b"/>
                                        </div>
                                        <button disabled={predict || balance - bet <= 0} onClick={(e) => {
                                            e.preventDefault();
                                            this.predictSubmit();
                                            this.setRate('up');
                                            click();
                                        }}
                                                className="btn green predict-btn">PREDICT UP
                                            <img src={arrowUp} width="15" height="20" alt="b"/>
                                        </button>
                                    </div>
                                    <p style={{display: predict && rate === 'up' ? 'flex' : 'none', margin: '0 59px'}} id="predict"
                                       className="btn bet-btn col-sm-4">
                                        <span>{counter}</span>
                                    </p>
                                    <Circle timer={{rate, counter}}/>
                                    <p style={{display: predict && rate === 'down' ? 'flex' : 'none', margin: '0 59px'}} id="predict"
                                       className="btn bet-btn col-sm-4">
                                        <span>{counter}</span>
                                    </p>
                                    <div style={{display: rate === 'down' || !rate ? 'block' : 'none'}}
                                         className="down">
                                        <div className="profit">
                                            <span className="red">Your ptofit</span>
                                            <span>0.85</span>
                                            <img src={bitcoin} width="15" height="20" alt="b"/>
                                        </div>
                                        <button disabled={predict || balance - bet <= 0} onClick={(e) => {
                                            e.preventDefault();
                                            this.predictSubmit();
                                            this.setRate('down');
                                            click();
                                        }}
                                                className="btn red predict-btn">PREDICT DOWN
                                            <img src={arrowDown} width="15" height="20" alt="b"/>
                                        </button>
                                    </div>
                                    <Circle timer={{rate, counter}}/>
                                </div>
                                {/*</>*/}
                                {/*: <>*/}
                                {/*</>}*/}
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
    closeCongratulation
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
