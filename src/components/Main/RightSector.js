import React, {useState} from 'react';
import deposit from '../../images/deposit.svg';
import withdraw from '../../images/withdraw.svg';
import arrowsGroup from '../../images/group_arrows.svg';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {click} from "../../redux/actions/music";
import bitcoin from "../../images/bitcoin.svg";


const RightSector = ({balance, lastWin, wins, predict, click}) => {
    const [switcher, setSwitcher] = useState(false);
    const balanceColor = {color: predict === 'green' ? '#32D74B' : predict === 'red' ? '#FF453A' : '#FFFFFF'}

    return (
        <div className="right-sector">
            <div style={{display: switcher ? "block" : "none"}} className="blur">

                <div className="round-dark win">
                    <h2>My bitcoin wallet</h2>
                    {/*<div className="text-center">You are going to play on real <br/> money. Are you sure? </div>*/}
                    <div className="win-btn">
                        <button onClick={() => setSwitcher(false)} className="btn btn-primary">Bet real bitcoin
                        </button>
                        <button onClick={() => setSwitcher(false)} className="btn btn-primary">Contunue demo
                        </button>
                    </div>
                </div>
            </div>
            <div className="score-wrap round-dark">
                <h2>Demo wallet <img onClick={()=> setSwitcher(true)} src={arrowsGroup} alt=""/></h2>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div className="label">Name</div>
                            <div className="score" id="name">Test</div>
                        </td>
                        <td>
                            <div className="label">Wins</div>
                            <div className="score" id="wins">{wins}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="label">Balance</div>
                            <div style={balanceColor} className="score" id="balance">{balance.toFixed(3)} BTC</div>
                        </td>
                        <td>
                            <div className="label">Last Win</div>
                            <div className="score" id="lastWin">{lastWin} BTC</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <Link to="/refill" className="btn money-btn green">DEPOSIT
                        <img src={deposit} alt="deposit"/>
                    </Link>
                    <button onClick={click} type="btn" className="btn money-btn red">WITHDRAW
                        <img src={withdraw} alt="withdraw"/>
                    </button>
                </div>
            </div>
            <div onClick={() => {
                window.location.href = 'https://bitrxapp.com/?gb';
            }} className="banner round-dark">
                <button className="btn learn-more">Learn more</button>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        balance: state.balanceReducer.balance,
        lastWin: state.balanceReducer.lastWin,
        predict: state.balanceReducer.predict,
        wins: state.balanceReducer.wins
    }
}
const mapDispatchToProps = {
    click
}
export default connect(mapStateToProps, mapDispatchToProps)(RightSector);
