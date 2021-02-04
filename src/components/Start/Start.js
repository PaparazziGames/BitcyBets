import React, {Component} from 'react';
import './start.scss';
import Graph from "../Graph";
import Time from "../Main/Time";
import bitcoin from "../../images/bitcoin.svg";
import {connect} from "react-redux";

class Start extends Component {
    render() {
        return (
            <div className="start">
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


                    <div className="">
                        <Time/>
                        <div>
                            <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                                {this.props.currentCourse} <span>$</span>
                            </h2>
                            <div>
                                {/*<SelectList/>*/}
                            </div>
                        </div>
                            <div className=" graph">
                                <Graph chartHeight={300}/>
                            </div>
                    </div>
                </div>
                <div className="bg"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentCourse: state.courseReducer.currentCourse,

    }
}
export default connect(mapStateToProps, null)(Start);
