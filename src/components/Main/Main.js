import React from 'react';
import './main.scss';
import bitcoin from '../../images/bitcoin.svg';
import Graph from "../Graph";
import RightSector from "./RightSector";
import Dashboard from "./Dashboard";
import SelectList from "./SelectList";

const Main = () => {
    return (
        <div>
            <main>
                <div className="row">
                    <div className="col-md-9">
                        <div className="round globe">
                            <div>
                                <h2 className="text-center"><img src={bitcoin} className="m-2" alt="course"/>
                                    23 552.86 <span>$</span>
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

export default Main;
