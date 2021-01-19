import React from 'react';
import deposit from '../../images/deposit.svg';
import withdraw from '../../images/withdraw.svg';
import arrowsGroup from '../../images/group_arrows.svg';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {click} from "../../redux/actions/music";


const RightSector = ({balance, lastWin, wins, predict, click}) => {
    const balanceColor = {color: predict === 'green' ? '#32D74B' : predict === 'red' ? '#FF453A' : '#FFFFFF'}

    return (
        <div className="right-sector">

            <div className="score-wrap round-dark">
                <h2>Demo wallet <img src={arrowsGroup} alt=""/></h2>
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
            <div className="banner round-dark">
                <hr/>
                <p className="text-center">Your ad can be <span className="gold">here</span></p>
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
