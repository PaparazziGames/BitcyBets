import React, {useEffect} from 'react';
import {connect} from "react-redux";
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
// import SelectList from "./SelectList";
import {closeCongratulation, createAd, logoutQuestion, prohibition} from "../../redux/actions";
import {money, stop} from "../../redux/actions/music";
import JS_FIREWORKS from "../fireworks";
import Time from "./Time";
import Preloader from "./Preloader";
import {userdata} from "../../redux/actions/game";
import {Link} from "react-router-dom";
import SelectList from "./SelectList";

const fire = () => {
    document.getElementById('fireworks-canvas').style.width = '100%'
    document.getElementById('fireworks-canvas').style.height = '100%'
    const firework = JS_FIREWORKS.Fireworks({
        id: 'fireworks-canvas',
        hue: 120,
        particleCount: 100,
        delay: 0,
        minDelay: 5,
        maxDelay: 10,
        boundaries: {
            top: 50,
            bottom: 240,
            left: 50,
            right: 590
        },
        fireworkSpeed: 2,
        fireworkAcceleration: 1.05,
        particleFriction: .95,
        particleGravity: 1.5
    });
    firework.start();
};

const Main = ({history, course, lastWin, closeCongratulation, congratulation, currentCourse, money, muteToggle, logout, logoutQuestion, prohibition, userdata, lastWinGame, createAd, createAdProp}) => {
    useEffect(() => {
        userdata();
        fire();
    }, [congratulation])
    useEffect(() => {
        fire();
    }, [])
    let flag = course ? course.length : false;
    return (
        <div className="main">
            <Preloader show={flag}/>
            <div style={{display: congratulation ? "block" : "none"}} className="blur">
                <canvas width="640" height="480" id="fireworks-canvas" style={{background: 'rgba(0,0,0, .2)'}}/>
                <div className="round-dark win">
                    <h2>Congratulations</h2>
                    <div className="text-center">You won {lastWinGame || 1} <img src={bitcoin} width="15" alt="bit"/></div>
                    <div className="win-btn">
                        <button onClick={() => {
                            closeCongratulation();
                            userdata();
                            document.getElementById('fireworks').pause();
                            money();
                        }} className="btn btn-primary">ADD TO MY WALLET
                        </button>
                        <button disabled onClick={() => {
                            closeCongratulation();
                            userdata();
                            document.getElementById('fireworks').pause();
                            money();
                        }} className="btn btn-primary">WITHDRAW
                        </button>
                    </div>
                </div>
            </div>

            <div style={{display: createAdProp ? "block" : "none"}} className="blur soon">
                <div className="round-dark win">
                    <div className="win-btn">
                        <h2>This feature coming soon</h2>
                        <button onClick={() => {
                            createAd();
                        }} className="btn btn-primary">OK
                        </button>
                    </div>
                </div>
            </div>
            <main style={{display: flag ? 'block':'none'}}>
                <div className="row main">
                    <div className="left-sector">
                        <div className="round globe">
                            <Time/>
                            <div>
                                <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                                    {currentCourse} <span>$</span>
                                </h2>
                                <div>
                                    <SelectList/>
                                </div>
                            </div>
                            <div className="graph-wrapper">
                                <div className="graph">
                                    <Graph/>
                                </div>
                            </div>
                        </div>
                        <Dashboard/>
                    </div>
                    <RightSector/>
                </div>
            </main>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        course: state.courseReducer.course,
        currentCourse: state.courseReducer.currentCourse,
        lastWin: state.balanceReducer.lastWin,
        lastWinGame: state.balanceReducer.lastWinGame,
        congratulation: state.balanceReducer.congratulation,
        logout: state.authReducer.logoutQuestion,
        createAdProp: state.switchOptions.createAd
    }
}
const mapDispatchToProps = {
    closeCongratulation,
    money,
    stop,
    logoutQuestion,
    prohibition,
    userdata,
    createAd
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
