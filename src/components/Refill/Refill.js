import React, {useState} from 'react';
import './refill.scss';
import bitcoin from "../../images/bitcoin.svg";
import dollar from "../../images/dollar.svg";
import arrows from "../../images/arrows.svg";
import back from "../../images/back.svg";
import {Link} from "react-router-dom";
import Header from "../Header/Header";

let socket = new WebSocket("wss://bitcybets.com:8080/serv");
let bitcoins = [];
socket.onmessage = async e => {
    (JSON.parse(e.data)).forEach(course => {
        bitcoins.push(course.Bitcoin);
    });
}
const Refill = (props) => {
    let currentCourse = bitcoins[bitcoins.length - 1];
    const [bit, setBit] = useState(0);
    const [usd, setUsd] = useState(0);
    const [reverse, setReverse] = useState(false);
    return (
        <div>
            <Header/>
            <div className="refill">
                <div className="round-dark">
                    <span onClick={() => props.history.goBack()} className="back"><img src={back} alt="back"/></span>
                    <h2>How to fulfill</h2>
                    <p>We are glad that you are going to be with us</p>
                    <div className="amount">Amount</div>
                    <br/>
                    <div className={reverse ? "refill-input flex-row-reverse" : "refill-input"}>
                        <div className="input-wrap">
                            <input value={bit}
                                   onChange={(e) => {
                                       setBit(e.target.value);
                                       setUsd(e.target.value * currentCourse);
                                   }}
                                   placeholder="0.000" type="text"/><img className="currency" src={bitcoin} width="15"
                                                                         alt="btc"/>
                        </div>
                        <img onClick={()=> setReverse(!reverse)} className="arrows" src={arrows} alt="arrows"/>
                        <div className="input-wrap">
                            <input value={usd}
                                   onChange={(e) => {
                                       setUsd(e.target.value);
                                       setBit(e.target.value / currentCourse);
                                   }}
                                   placeholder="0.000" type="text"/><img className="currency" src={dollar}
                                                                                     width="15"
                                                                                     alt="usd"/>
                        </div>
                    </div>
                    <div className="refill-btn">
                        <Link to="/refill/btc" className="pay"><span>DEPOSIT</span><img src={bitcoin} width="15"
                                                                                        alt="bit"/></Link>

                        <Link to="/refill/usd" className="pay"><span>DEPOSIT</span><img src={dollar} width="15"
                                                                                        alt="bit"/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refill;
