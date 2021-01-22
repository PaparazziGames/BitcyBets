import React from 'react';
import bitcoin from "../../images/bitcoin.svg";

const Offer = () => {
    return (
        <div style={{display: winnings ? "block" : "none"}} className="blur">
            <div className="round-dark win">
                <h2>Congratulations</h2>
                <div className="text-center">You won {lastWin} <img src={bitcoin} width="15" alt="bit"/></div>
                <div className="win-btn">
                    <button onClick={() => {
                        closeCongratulation();
                        money();
                    }} className="btn btn-primary">INVEST in crypto
                    </button>
                    <button disabled onClick={() => {
                        closeCongratulation();
                        document.getElementById('fireworks').pause();
                        money();
                    }} className="btn btn-primary">TRAIN WITH US
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Offer;
