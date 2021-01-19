import React from 'react';
import up from "../../images/up.svg";
import person from "../../images/person.svg";
import bitcoin from "../../images/bitcoin.svg";
import down from "../../images/down.svg";

const Rates = () => {
    return (
        <div className="round rates">
            <h2 className="text-left">Bets in progress</h2>
            <div className="wrap-table">
                <div style={{background: `#32D74B`}} className="rates-col rates-up">
                    <div className="text">
                        <span className="mb-1">10<img className="mb-1" src={person} alt=""/></span>
                        <span className='pr-2'>0.125<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>
                    </div>
                </div>
                <div style={{background: '#F7931A'}} className="rates-co bank">
                    <h6>Total bank</h6>
                    <span>2.536</span>
                </div>
                <div style={{background: '#FF453A'}} className="rates-col rates-down">
                    <div className="text">
                        <span className="mb-1">20<img className="mb-1" src={person} alt=""/></span>
                        <span className='pr-2'>0.185<img className="mb-1" width="15" height="20" src={bitcoin} alt=""/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rates;
