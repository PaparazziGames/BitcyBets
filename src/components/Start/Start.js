import React, { useState, useEffect } from 'react';
import './start.scss';
import Graph from "../Graph";
import Time from "../Main/Time";
import bitcoin from "../../images/bitcoin.svg";
import {connect} from "react-redux";
import arrowDown from "../../images/arrowDown.svg";
import arrowUp from "../../images/arrowUp.svg";
import Rect from "../Main/Rect/Rect";

const Start = ({currentCourse, course}) => {
    const [bet, setBet] = useState('');
    const [predict, setPredict] = useState('');
    useEffect(() => {
        if(bet === 'down' && currentCourse < course[course.length - 2]) {
            setPredict('win')
        } else if(bet === 'down' && currentCourse > course[course.length - 2]) {
            setPredict('lose')
        } else if(bet === 'up' && currentCourse > course[course.length - 2]) {
            setPredict('win')
        } else if(bet === 'up' && currentCourse < course[course.length - 2]) {
            setPredict('lose')
        } else {
            setBet('');
        }
    }, [currentCourse])
        return (
            <div className="start">
                <div style={{display: bet && predict === 'win' ? "block" : "none"}} className="blur soon">
                    <div className="round-dark win">
                        <div className="win-btn">
                            <h2>You lose</h2>
                            <button onClick={() => {
                                setPredict('');
                                setBet('');
                            }} className="btn btn-primary">OK
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{display: bet && predict === 'lose' ? "block" : "none"}} className="blur soon">
                    <div className="round-dark win">
                        <div className="win-btn">
                            <h2>You win</h2>
                            <button onClick={() => {
                                setPredict('');
                                setBet('');
                            }} className="btn btn-primary">OK
                            </button>
                        </div>
                    </div>
                </div>
                <div className="round round-dark">
                    <div className="text text-center">
                        <span className="gold">Real ICO</span>
                        <h2>Make Bitcoin bets</h2>
                        <p>
                            Now you can earn real bitcoin just by <br/> simply guessing if bitcoin price will rise
                            UP <br/> or go
                            DOWN in the next ten seconds
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
                            <button disabled={bet} onClick={() => setBet('down')} className="btn green predict-btn" id="down">PREDICT UP
                                <img src={arrowUp} width="15" height="20" alt="b"/>
                                <Rect infinite={'infinity'} idButton={'down'} mode={'rectUp'}/>
                            </button>
                            <button disabled={bet} onClick={() => setBet('up')} className="btn red predict-btn" id="down">PREDICT DOWN
                                <img src={arrowDown} width="15" height="20" alt="b"/>
                                <Rect infinite={'infinity'} idButton={'down'} mode={'rectDown'}/>
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
        course: state.courseReducer.course

    }
}
export default connect(mapStateToProps, null)(Start);
