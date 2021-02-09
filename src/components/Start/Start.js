import React, {useState, useEffect} from 'react';
import './start.scss';
import Graph from "../Graph";
import Time from "../Main/Time";
import bitcoin from "../../images/bitcoin.svg";
import {connect} from "react-redux";
import arrowDown from "../../images/arrowDown.svg";
import arrowUp from "../../images/arrowUp.svg";
import bull from "../../images/bull_start.png";
import bear from "../../images/bear_start.png";
import Rect from "../Main/Rect/Rect";

const Start = ({currentCourse, course, history, lastSeconds}) => {
    const [timeGame, setTimeGame] = useState(false);
    const [bet, setBet] = useState('');
    const [predict, setPredict] = useState('');
    useEffect(() => {
        if(lastSeconds % 10 === 0) {
            setTimeGame(true);
        }
    }, [lastSeconds])
    useEffect(() => {
        if(lastSeconds % 10 === 0) {
            if (bet === 'down' && currentCourse < course[course.length - 2]) {
                setPredict('win');
                setBet('');
            } else if (bet === 'down' && currentCourse > course[course.length - 2]) {
                setPredict('lose');
                setBet('');
            } else if (bet === 'up' && currentCourse > course[course.length - 2]) {
                setPredict('win');
                setBet('');
            } else if (bet === 'up' && currentCourse < course[course.length - 2]) {
                setPredict('lose');
                setBet('');
            } else {
                setBet('');
            }
        }

    }, [currentCourse])
    return (
        <div className="start">
            <div style={{display: predict === 'win' ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                        <h2>Sorry, you're out of luck! <br/> try again!</h2>
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                        }} className="btn btn-primary">OK
                        </button>
                    </div>
                </div>
            </div>
            <div style={{display: predict === 'lose' ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                       <span onClick={() => {
                           setPredict('');
                           setBet('');
                       }} className="back">&#10008;</span>
                        <h2>You are doing a great job!</h2>
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                            history.push('/login')
                        }} className="btn btn-primary">LOG IN
                        </button>
                        <button onClick={() => {
                            setPredict('');
                            setBet('');
                            history.push('/signup')
                        }} className="btn btn-primary">SIGN UP
                        </button>
                    </div>
                </div>
            </div>
            <div className="round round-dark">
                <div className="bull-start"><img src={bull} alt="bull"/></div>
                <div className="bear-start"><img src={bear} alt="bear"/></div>
                <div className="text text-center">
                    <span className="gold">Real ICO</span>
                    <h2>Make Bitcoin bets</h2>
                    <p>
                        Welcome to bytcybets.com
                    </p>
                </div>

                <div className="dark">
                    <Time/>
                    <div>
                        <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                            {currentCourse} <span>$</span>
                        </h2>
                        <div>
                            {/*<SelectList/>*/}
                        </div>
                    </div>
                    <div className="graph">
                        <Graph gradient1={20} gradient2={150} chartHeight={200}/>
                    </div>
                    <div className="buttons">
                        <div className="wrap-btn">
                            <button disabled={bet} onClick={() => setBet('down')} className="btn green predict-btn"
                                    id="down">PREDICT UP
                                <img src={arrowUp} width="15" height="20" alt="b"/>
                                <Rect start={timeGame} infinite={'infinity'} idButton={'down'} mode={timeGame ? 'rectUp' : ''}/>
                            </button>
                            <button disabled={bet} onClick={() => setBet('up')} className="btn red predict-btn"
                                    id="down">PREDICT DOWN
                                <img src={arrowDown} width="15" height="20" alt="b"/>
                                <Rect infinite={'infinity'} idButton={'down'} mode={timeGame ? 'rectDown' : ''}/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg"/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentCourse: state.courseReducer.currentCourse,
        course: state.courseReducer.course,
        lastSeconds: state.courseReducer.lastSeconds

    }
}
export default connect(mapStateToProps, null)(Start);
