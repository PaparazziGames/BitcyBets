import React, {useState, useEffect} from 'react';
import deposit from '../../images/deposit.svg';
import withdraw from '../../images/withdraw.svg';
import {connect} from "react-redux";
import {geoposition} from "../../redux/actions";

const RightSector = ({geoposition, geo}) => {
    useEffect(() => {
        geoposition()
    },[])
    let [time, setTime] = useState(new Date().toLocaleTimeString())
    clearInterval()
    setInterval(() => setTime(new Date().toLocaleTimeString()))
    return (
        <div className="col-md-3 right-sector">
            <div className="banner round-dark">
                <div className="row img"/>
                <div className="text">
                    <h5>Ad banner</h5>
                    <p>Your ad can be here</p>
                </div>
            </div>
            <div className="score-wrap round-dark">
                <h2>Score</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <div className="label">Name</div>
                            <div className="score" id="name">Test</div>
                        </td>
                        <td>
                            <div className="label">Wins</div>
                            <div className="score" id="wins">2</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="label">Balance</div>
                            <div className="score" id="balance">0.500 BTC</div>
                        </td>
                        <td>
                            <div className="label">Last Win</div>
                            <div className="score" id="lastWin">0.100 BTC</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <button type="btn" className="btn money-btn green">DEPOSIT
                        <img src={deposit} alt="deposit"/>
                    </button>
                    <button type="btn" className="btn money-btn red">WITHDRAW
                        <img src={withdraw} alt="withdraw"/>
                    </button>
                </div>
            </div>
            <div className="time round-dark">
                <div className="label text-center">{geo || 'Kyiv'}</div>
                <h2 className="time-text">{time}</h2>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        geo: state.geoReducer.geoposition
    }
}
const mapDispatchToProps = {
    geoposition
}
export default connect(mapStateToProps, mapDispatchToProps)(RightSector);
