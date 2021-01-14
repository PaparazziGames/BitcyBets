import React from 'react';
import './refill.scss';
import bitcoin from "../../images/bitcoin.svg";
import dollar from "../../images/dollar.svg";
import arrows from "../../images/arrows.svg";
import back from "../../images/back.svg";

const Refill = (props) => {
    return (
        <div className="refill">
            <span onClick={() => props.history.goBack()} className="back"><img src={back}  alt="back"/></span>
            <div className="round-dark">
                <h2>How to fulfill</h2>
                <p>We are glad that you are going to be with us</p>
                <div className="amount">Amount</div><br/>
                <div className="refill-input">
                    <div className="input-wrap">
                        <input placeholder="0.000" type="text"/><img src={bitcoin} width="15" alt="bit"/>
                    </div>
                    <img className="arrows" src={arrows} alt="arrows"/>
                    <div className="input-wrap">
                        <input placeholder="0.000" type="text"/><img src={dollar} width="15" alt="bit"/>
                    </div>
                </div>
                <div className="refill-btn">
                    <button className="">PAY<img src={bitcoin} width="15" alt="bit"/></button>

                    <button className="">PAY<img src={dollar} width="15" alt="bit"/></button>
                </div>
            </div>
        </div>
    );
};

export default Refill;
