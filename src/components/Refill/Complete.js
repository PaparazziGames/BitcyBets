import React, {useState, useEffect} from 'react';
import './refill.scss';
import {Link} from "react-router-dom";
import Header from "../Header/Header";



const Complete = (props) => {

    return (
        <div>
            <Header/>
            <div className="refill">
                <div style={{height: "250px"}} className="round-dark">
                    <h2 className="pay-header">Payment complete</h2>
                    <div className="text-center">Have a luck in your bets</div>
                    <div className="refill-btn">
                        <Link to="/game" className="pay"><span>Go to bets</span></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complete;
