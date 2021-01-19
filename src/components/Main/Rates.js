import React from 'react';
import arrup from "../../images/arrup.png";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import arrdown from "../../images/arrdown.png";

const Rates = () => {
    const rateUp = 40 * 0.125 / 0.185;
    const rateDown = 40 * 0.185 / 0.125;
    return (
        <div className="round rates">
            <h2 className="text-left">Bets in progress</h2>
            <div className="wrap-table">
                <div  className="rates-col rates-up">
                    <img className="arrow" src={arrup} alt="arrow"/>
                    <div style={{height: `${ rateUp <= 100 ? rateUp : 100 }%`}} className="green-bg backgroundRate"/>
                    <div className="text">
                        <span className="mb-1 persons">10<img className="mb-1" src={person} alt=""/></span>
                        {/*<span className='pr-2'>0.125<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>*/}
                    </div>
                </div>
                <div  className="rates-col bank">
                    <div style={{height: '50%'}} className="gold-bg backgroundRate"/>
                    <h6>Bank</h6>
                    <span className="nowrap" id="bank-sum">0.333<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>
                </div>
                <div className="rates-col rates-down">
                    <img className="arrow" src={arrdown} alt="arrow"/>
                    <div style={{height: `${ rateDown <= 100 ? rateDown : 100 }%`}}  className="red-bg backgroundRate"/>
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
