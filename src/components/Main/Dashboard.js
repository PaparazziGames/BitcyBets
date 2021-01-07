import React from 'react';
import up from "../../images/up.svg";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import down from "../../images/down.svg";
import arrowUp from "../../images/arrowUp.svg";
import arrowDown from "../../images/arrowDown.svg";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bet: .5, balance: .5};
        this.setBet = this.setBet.bind(this);
    }

    setBet(e) {
        const newBet = {bet: e.target.value}
        this.setState((state) => ({...state, ...newBet}));
    }

    render() {
        const { bet, balance } = this.state;
        return (
            <div className="round dashboard">
                <div className="row">
                    <div className="col-xl-4 best">
                        <h2 className="text-center">Best in progress</h2>
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
                            <div className="form row" >
                                <div className="bet col-sm-8">
                                    <label className="form-label d-flex justify-content-between">
                                        <span>Bet</span>
                                        <span>
                                            <span>{bet}</span>
                                            <img width="15" src={bitcoin} alt="up"/>
                                        </span>
                                    </label>
                                    <input min="0" max="1" step="0.001"
                                           type="range"
                                           onInput={this.setBet}
                                           className="form-range"
                                           id="range"/>
                                </div>
                                { balance - bet >= 0
                                    ? <>
                                    </>
                                    :  <>
                                        <input value="Not enough" type="button" className="btn bet-btn col-sm-4"/>
                                        <button className="btn refill-btn">Refill
                                            <img src={bitcoin} width="15" height="20" alt="b"/>
                                        </button>
                                    </> }
                            </div>
                            { balance - bet >= 0
                                ? <div className='wrap-btn'>
                                    <button className="btn green predict-btn">PREDICT UP
                                        <img src={arrowUp} width="15" height="20" alt="b"/>
                                    </button>
                                    <button className="btn red predict-btn">PREDICT DOWN
                                        <img src={arrowDown} width="15" height="20" alt="b"/>
                                    </button>
                                </div>
                                :  <>
                                </> }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
