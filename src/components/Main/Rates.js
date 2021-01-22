import React from 'react';
import arrup from "../../images/arrup.png";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import arrdown from "../../images/arrdown.png";
import {User} from "../../api/User";

const Rates = () => {
    const rateUp = 30 * 0.125 / 0.185;
    const rateDown = 30 * 0.185 / 0.125;

    const getRate = () => {
        User.rate(JSON.stringify({accessToken: localStorage.getItem('token')}))
            .then(response => console.log(response))
    }

    return (
        <div className="round rates">
            <h2 className="text-center">Bets in progress</h2>
            <div className="wrap-table">
                <div className="rates-col rates-up">
                    <img className="arrow" src={arrup} alt="arrow"/>
                    <div style={{height: `${rateUp <= 80 ? rateUp : 80}%`}} className="green-bg backgroundRate"/>
                    <div className="text">
                        <span className="mb-1 persons">10<img className="mb-1" src={person} alt=""/></span>
                        {/*<span className='pr-2'>0.125<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>*/}
                    </div>
                </div>
                <div className="rates-col bank">
                    <img className="arrow middle" src={bitcoin} alt="arrow"/>
                    <div style={{height: '70%'}} className="gold-bg backgroundRate"/>
                    <div className="text">
                        <span className="mb-1 nowrap persons">0.333<img className="bank-img" width="15" height="20"
                                                                        src={bitcoin} alt=""/></span>
                    </div>
                </div>
                <div className="rates-col rates-down">
                    <img className="arrow" src={arrdown} alt="arrow"/>
                    <div style={{height: `${rateDown <= 80 ? rateDown : 80}%`}} className="red-bg backgroundRate"/>
                    <div className="text">
                        <span className="mb-1 persons">20<img className="mb-1" src={person} alt=""/></span>
                        {/*<span className='pr-2'>0.185<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rates;
