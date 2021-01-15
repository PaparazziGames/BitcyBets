import React, {useState} from 'react';
import back from "../../images/back.svg";
import visa from "../../images/visa.svg";
import mastercard from "../../images/mastercard.svg";
import dollar from "../../images/dollar.svg";

const Usd = (props) => {
    const [done, setDone] = useState(false);
    if(!done) {
        return (
            <div className="refill false">
                <span onClick={() => props.history.goBack()} className="back"><img src={back}  alt="back"/></span>
                <div className="round-dark main-usd">
                    <h2>Payment by USD</h2>
                    <p>Enter your bank card</p>
                    <div className="wrap-img"><img src={visa} alt="visa"/><img src={mastercard} alt="master"/></div>
                    <div className="amount label-payment">Card number</div>
                    <div className="refill-input mb-3">
                        <div className="input-wrap">
                            <input className="card-number" placeholder="_ _ _ _ – _ _ _ _ – _ _ _ _ – _ _ _ _" type="text"/>
                        </div>
                    </div>
                    <div className="amount"><span>Expiring</span><span className="left">CVC</span></div><br/>

                    <div className="refill-input">
                        <div className="input-wrap">
                            <input placeholder="_ _ /_ _" type="text"/>
                        </div>
                        <div className="input-wrap">
                            <input placeholder="_ _ _" type="text"/>
                        </div>
                    </div>
                    <div className="refill-btn">
                        <button onClick={() => setDone(true)} className="pay">PAY<img src={dollar} width="15" alt="bit"/></button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="refill done">
                <div className="round-dark main-usd">
                    <h2>Payment complete</h2>
                    <p>Have a luck in your bets</p>
                    <div className="refill-btn">
                        <button onClick={() => props.history.push('/')} className="pay">Go to bets</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default Usd;
