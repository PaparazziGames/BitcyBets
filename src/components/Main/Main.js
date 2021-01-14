import React from 'react';
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
import SelectList from "./SelectList";
import {connect} from "react-redux";
import {closeCongratulation} from "../../redux/actions";

const Main = ({course, lastWin, closeCongratulation, congratulation}) => {
    let currentCourse = course[course.length - 1];
    return (
        <div className="main">
            <div style={{display: congratulation ? "block" : "none"}} className="blur">
                <div className="round-dark win">
                    <h2>Congratulations</h2>
                    <div className="text-center">You won {lastWin} <img src={bitcoin} width="15" alt="bit"/></div>
                    <div className="win-btn">
                        <button onClick={closeCongratulation} className="btn btn-primary">Invest in my wallet</button>
                        <button onClick={closeCongratulation} className="btn btn-primary">Withdraw</button>
                    </div>
                </div>
            </div>
            <main>
                <div className="row main">
                    <div className="left-sector">
                        <div className="round globe">
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
                        <div>
                            <Dashboard/>
                        </div>
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
        lastWin: state.balanceReducer.lastWin,
        congratulation: state.balanceReducer.congratulation,
    }
}
const mapDispatchToProps = {
    closeCongratulation

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
