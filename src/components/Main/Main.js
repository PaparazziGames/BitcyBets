import React from 'react';
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
import SelectList from "./SelectList";
import {connect} from "react-redux";

const Main = ({course}) => {
    let currentCourse = course[course.length - 1];
    return (
        <div className="main">
            <main>
                <div className="row">
                    <div className=" left-sector">
                        <div className="round globe">
                            <div>
                                <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                                    {currentCourse} <span>$</span>
                                </h2>
                                <div>
                                    <SelectList />
                                </div>
                            </div>
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
        course: state.courseReducer.course
    }
}
export default connect(mapStateToProps, null)(Main);
