import React from 'react';
import bitcoin from "../../images/bitcoin.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";
import {betLose, betWin, closeCongratulation} from "../../redux/actions";
import {bell, click, tic, fireworks, muteToggle} from "../../redux/actions/music";
import Rates from "./Rates";
import {User} from "../../api/User";
import {predictClear, predictDown, predictUp, userdata} from "../../redux/actions/game";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bet: .001,
            // predict: false,
            counter: 10,
            counterBet: 10,
            // rate: '',
            initialOffset: 440,
            gameStart: undefined
        };
        this.setBet = this.setBet.bind(this);
        this.predictSubmit = this.predictSubmit.bind(this);
        this.countSec = this.countSec.bind(this);
        this.betDone = this.betDone.bind(this);
        // this.setPredict = this.setPredict.bind(this);
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

    // setRate(rate) {
    //     this.setState((state) => (Object.assign({rate: rate}, state)));
    // }

    async betDone(e) {
        let rate = e.target.id;
        // this.setRate(rate);
        this.props.click();
        await rate === 'up' ? this.props.predictUp({value: this.state.bet.toString()}) : this.props.predictDown({value: this.state.bet.toString()});
    }

    countSec() {
        const betTimer = setInterval(() => {
            this.setState((state) => ({...state, counterBet: state.counterBet - 1}));
            // this.props.tic();
        }, 1000)
        return setTimeout(() => {
            clearInterval(betTimer);
            this.setState((state) => ({...state, counterBet: 10}));
        }, 10000)
    }

    predictSubmit() {
        const timer = setInterval(() => {
            this.setState((state) => ({...state, counter: state.counter - 1}));
            // this.props.tic();
        }, 1000)
        const predict = this.props.predict;
        return setTimeout(() => {
            clearInterval(timer);
            this.setState((state) => ({...state, counter: 10}));
            User.userdata()
                .then(data => {
                    if (+data.data.data.lastWin === 1 && predict !== '') {
                        this.props.bell();
                        this.props.betWin();
                        this.props.fireworks();
                    } else if (+data.data.data.lastWin === -1 && predict !== '') {
                        this.props.bell();
                        this.props.betLose();
                        this.props.userdata();
                    }
                })
            this.setState((state) => ({...state, gameStart: undefined}));
            this.props.predictClear();
            this.countSec();
        }, 10000)
    }

    render() {
        const {bet, counter, initialOffset, counterBet} = this.state;
        const {balance, currentTime, predict, upBets, downBets, up, down, userdata} = this.props;
        const time = 10;
        const i = 10 - counter || 1;
        const newBet = /*arrBet.length === 2 ? bet + '00' : arrBet.length === 3 ? bet + '0' : arrBet.length === 1 ? bet + '.000' :*/ bet;
        const currentTimeSec = currentTime ? +currentTime.substr(6) : 0;
        let timeBet = currentTimeSec === 0 || currentTimeSec === 20 || currentTimeSec === 40 || currentTimeSec === 5 || currentTimeSec === 25 || currentTimeSec === 45;
        let startGame = currentTimeSec === 10 || currentTimeSec === 30 || currentTimeSec === 50 || currentTimeSec === 15 || currentTimeSec === 35 || currentTimeSec === 55;

        if (startGame && this.state.gameStart === undefined) {
            this.setState((state) => ({...state, gameStart: currentTimeSec}));
            this.predictSubmit();
        } else {

        }
        return (
            <div className="row bottom-container">
                <Rates/>
                <div className="round dashboard">
                    <div className="range">
                        <div className="form-label d-flex justify-content-between">
                            <div>
                                <h2 className={predict || startGame ? "text-left" : "make-bet text-left"}>Make your
                                    bet</h2>
                                <span className="time-bet">{timeBet ? counterBet : ''}</span>
                            </div>
                            <div>
                                <span className={balance - bet >= 0 ? '' : 'red'}>
                                <input id="numberBet" type="number" step="0.001" min="0.001" max="1"
                                       className={balance - bet >= 0 ? '' : 'red'}
                                       disabled={predict || !timeBet}
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
                                           disabled={predict || !timeBet || startGame}
                                           value={newBet}
                                           style={{backgroundImage: `linear-gradient(to right, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} 0%, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} ${bet * 100}%, #fff ${bet * 100}%, white 100%)`}}
                                           onChange={this.setBet}
                                           className={balance - bet >= 0 ? 'green-range' : 'red-range'}
                                           id="range"/>
                                </div>
                                <div className='wrap-btn'>

                                    {startGame && (predict === 'down' || !predict)
                                        ? <span style={{display: startGame && !predict ? 'flex' : 'none'}}
                                                className="off">All bets are off</span>
                                        : <div style={{
                                            display: predict === 'up' || !predict ? 'block' : 'none',
                                            transform: startGame && (predict === 'down' || !predict) ? 'scale(0)' : 'scale(1)'
                                        }} className="up">
                                            <div className="profit">
                                                <span className="green">Your profit</span>
                                                <span>
                                                    {up || down ? ((bet / (bet + upBets) * downBets + bet) * 0.97).toFixed(3) : 0}
                                                </span>
                                                <img src={bitcoin} width="15" height="20" alt="b"/>
                                            </div>
                                            <button disabled={predict || balance - bet < 0 || !timeBet}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.betDone(e);
                                                    }}
                                                    className="btn green predict-btn" id="up">PREDICT UP

                                                {/*<svg id="rectUp" width="200" height="40">*/}
                                                {/*    <rect x="2" y="2" rx="8" ry="8" width="195" height="36"*/}
                                                {/*          style={{*/}
                                                {/*              fill: 'none',*/}
                                                {/*              stroke: 'lime',*/}
                                                {/*              strokeWidth: 5,*/}
                                                {/*              opacity: 0.5*/}
                                                {/*          }}/>*/}
                                                {/*</svg>*/}
                                                <img src={arrowUp} width="15" height="20" alt="b"/>
                                            </button>
                                        </div>}

                                    <p
                                        style={{
                                            display: startGame && predict === 'up' ? 'flex' : 'none',
                                            margin: '0 59px'
                                        }}
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


                                    <p style={{
                                        display: startGame && (predict === 'down' || !predict) ? 'flex' : 'none',
                                        margin: '0 59px'
                                    }}
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

                                    {startGame && (predict === 'up' || !predict)
                                        ? <></>
                                        : <div style={{display: (predict === 'down' || !predict) ? 'block' : 'none'}}
                                               className="down">
                                            <div className="profit">
                                                <span className="red">Your profit</span>
                                                <span>
                                                    {up || down ? ((bet / (bet + downBets) * upBets + bet) * 0.97).toFixed(3) : 0}
                                                </span>
                                                <img src={bitcoin} width="15" height="20" alt="b"/>
                                            </div>
                                            <button disabled={predict || balance - bet < 0 || !timeBet}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.betDone(e);
                                                    }}
                                                    className="btn red predict-btn" id="down">PREDICT DOWN
                                                <img src={arrowDown} width="15" height="20" alt="b"/>
                                            </button>
                                        </div>
                                    }


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
        lastWin: state.balanceReducer.lastWin,
        predict: state.balanceReducer.predict,
        downBets: state.balanceReducer.downBets,
        upBets: state.balanceReducer.upBets,
        up: state.balanceReducer.up,
        down: state.balanceReducer.down
    }
}
const mapDispatchToProps = {
    betWin,
    betLose,
    predictUp,
    predictDown,
    predictClear,
    click,
    tic,
    bell,
    fireworks,
    closeCongratulation,
    muteToggle,
    userdata
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
