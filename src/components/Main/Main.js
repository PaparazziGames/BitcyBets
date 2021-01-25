import React, {useEffect} from 'react';
import {connect} from "react-redux";
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
import SelectList from "./SelectList";
import {closeCongratulation, logoutQuestion, prohibition} from "../../redux/actions";
import {money, stop} from "../../redux/actions/music";
import JS_FIREWORKS from "../fireworks";
import Time from "./Time";
import Preloader from "./Preloader";

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

const Main = ({course, lastWin, closeCongratulation, congratulation, currentCourse, money, muteToggle, logout, logoutQuestion, prohibition}) => {
    // const [show, setShow] = useState(false);
    // setTimeout(() => {
    //     setShow(true)
    // }, 5000)
    useEffect(() => {
        fire();
    }, [])
    return (
        <div className="main">
            <Preloader show={course.length}/>
            <div style={{display: congratulation ? "block" : "none"}} className="blur">
                <canvas width="640" height="480" id="fireworks-canvas" style={{background: 'rgba(0,0,0, .2)'}}/>
                <div className="round-dark win">
                    <h2>Congratulations</h2>
                    <div className="text-center">You won {lastWin} <img src={bitcoin} width="15" alt="bit"/></div>
                    <div className="win-btn">
                        <button onClick={() => {
                            closeCongratulation();
                            document.getElementById('fireworks').pause();
                            money();
                        }} className="btn btn-primary">ADD TO MY WALLET
                        </button>
                        <button disabled onClick={() => {
                            closeCongratulation();
                            document.getElementById('fireworks').pause();
                            money();
                        }} className="btn btn-primary">WITHDRAW
                        </button>
                    </div>
                </div>
            </div>
            <div style={{display: logout ? "block" : "none"}} className="blur">
                <div className="round-dark win">
                    <h2>Are you sure?</h2>
                    <div className="win-btn">
                        <button onClick={() => {
                            logoutQuestion();
                            localStorage.removeItem('token');
                            prohibition();
                            clearInterval();
                        }} className="btn btn-primary">LOG OUT
                        </button>
                        <button onClick={() => {
                            logoutQuestion();
                        }} className="btn btn-primary">CONTINUE
                        </button>
                    </div>
                </div>
            </div>
            <main style={{display: course.length ? 'block':'none'}}>
                <div className="row main">
                    <div className="left-sector">
                        <div className="round globe">
                            <Time/>
                            {course.length ? (<div>
                                <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                                    {currentCourse.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} <span>$</span>
                                </h2>
                                <div>
                                    <SelectList/>
                                </div>
                            </div>) : <h1 className="text-center">Loading...</h1>}
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
        congratulation: state.balanceReducer.congratulation,
        logout: state.authReducer.logoutQuestion,
    }
}
const mapDispatchToProps = {
    closeCongratulation,
    money,
    stop,
    logoutQuestion,
    prohibition
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
