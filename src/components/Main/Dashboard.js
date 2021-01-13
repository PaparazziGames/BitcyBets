import React from 'react';
import up from "../../images/up.svg";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import down from "../../images/down.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";
import {connect} from "react-redux";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bet: .5, predict: false, counter: 10};
        this.setBet = this.setBet.bind(this);
        this.predictSubmit = this.predictSubmit.bind(this);
    }

    setBet(e) {
        const newBet = {bet: e.target.value}
        this.setState((state) => ({...state, ...newBet}));
    }

    predictSubmit(e) {
        e.preventDefault();
        const timer = setInterval(() => {
            this.setState((state) => ({...state, counter: state.counter - 1}));
        }, 1000)
        this.setState((state) => ({...state, predict: true}));
        return setTimeout(() => {
            clearInterval(timer);
            this.setState((state) => ({...state, predict: false, counter: 10}))
        }, 10000)
    }

    render() {
        const {bet, predict, counter} = this.state;
        const {balance} = this.props;
        return (
            <div className="round dashboard">
                <div className="row">
                    <div className="col-xl-4 best">
                        <h2 className="text-center">Bets in progress</h2>
                        <div className="wrap-table">
                            <table className="p-3 table-responsive">
                                <tbody>
                                <tr>
                                    <td className="text-center">
                                        <img src={up} alt="up"/>
                                    </td>
                                    <td className="text-center">
                                        <span>
                                            <span>10</span>
                                            <img src={person} alt="up"/>
                                        </span>
                                        <span>
                                            <span>0.125</span>
                                            <img width="15" src={bitcoin} alt="up"/>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">
                                        <img src={down} alt="up"/>
                                    </td>
                                    <td className="text-center">
                                        <span>
                                            <span>20</span>
                                            <img src={person} alt="up"/>
                                        </span>
                                        <span>
                                            <span>0.185</span>
                                            <img width="15" src={bitcoin} alt="up"/>
                                        </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="range col-xl-7">
                        <h2 className="text-center">Make your bet</h2>
                        <form>
                            <div className="form row">
                                <div className="bet col-sm-8">
                                    <label className="form-label d-flex justify-content-between">
                                        <span>Bet</span>
                                        <span>
                                            <span>{bet}</span>
                                            <img width="15" src={bitcoin} alt="up"/>
                                        </span>
                                    </label>
                                    <input min="0.001" max="1" step="0.001"
                                           type="range"
                                           disabled={predict}
                                           style={{backgroundImage: `linear-gradient(to right, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} 0%, ${balance - bet >= 0 ? '#32D74B' : '#FF453A'} ${bet * 100}%, #fff ${bet * 100}%, white 100%)`}}
                                           onInput={this.setBet}
                                           className={balance - bet >= 0 ? 'green-range' : 'red-range'}
                                           id="range"/>
                                </div>
                                {balance - bet >= 0
                                    ? <></>
                                    : <>
                                        <p className="btn bet-btn col-sm-4"><span>Not enough</span></p>
                                        <div className='wrap-btn'>
                                            <button className="btn refill-btn">Refill
                                                <img src={bitcoin} width="15" height="20" alt="b"/>
                                            </button>
                                        </div>
                                    </>}

                            {balance - bet >= 0
                                ? <>
                                    <p style={{display: predict ? 'block' : 'none'}} className="btn bet-btn col-sm-4"><span>00:{counter > 9 ? counter : '0' + counter}</span></p>
                                    <div className='wrap-btn'>
                                        <button disabled={predict} onClick={this.predictSubmit}
                                                className="btn green predict-btn">PREDICT UP
                                            <img src={arrowUp} width="15" height="20" alt="b"/>
                                        </button>
                                        <button disabled={predict} onClick={this.predictSubmit}
                                                className="btn red predict-btn">PREDICT DOWN
                                            <img src={arrowDown} width="15" height="20" alt="b"/>
                                        </button>
                                    </div>
                                </>
                                : <>
                                </>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {balance: state.balanceReducer.balance}
}

export default connect(mapStateToProps, null)(Dashboard);
