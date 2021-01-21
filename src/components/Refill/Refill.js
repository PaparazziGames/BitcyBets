import React from 'react';
import './refill.scss';
import bitcoin from "../../images/bitcoin.svg";
import dollar from "../../images/dollar.svg";
import arrows from "../../images/arrows.svg";
import back from "../../images/back.svg";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

const Refill = (props) => {
    return (
        <div>
            <Header/>
            <div className="refill">
                <span onClick={() => props.history.goBack()} className="back"><img src={back} alt="back"/></span>
                <div className="round-dark">
                    <h2>How to fulfill</h2>
                    <p>We are glad that you are going to be with us</p>
                    <div className="amount">Amount</div>
                    <br/>
                    <div className="refill-input">
                        <div className="input-wrap">
                            <input placeholder="0.000" type="text"/><img className="currency" src={bitcoin} width="15"
                                                                         alt="btc"/>
                        </div>
                        <img className="arrows" src={arrows} alt="arrows"/>
                        <div className="input-wrap">
                            <input placeholder="0.000" type="text"/><img className="currency" src={dollar} width="15"
                                                                         alt="usd"/>
                        </div>
                    </div>
                    <div className="refill-btn">
                        <Link to="/refill/btc" className="pay"><span>DEPOSIT</span><img src={bitcoin} width="15" alt="bit"/></Link>

                        <Link to="/refill/usd" className="pay"><span>DEPOSIT</span><img src={dollar} width="15" alt="bit"/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refill;
