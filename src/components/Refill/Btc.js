import React, {useState} from 'react';
import back from "../../images/back.svg";

const Btc = (props) => {
    const [copied, setCopied] = useState(false);
    const copy = (e) => {
        setCopied(true);
        document.getElementById('link').select();
        document.execCommand('copy');
    }
    return (
        <div className="refill btc">
            <span onClick={() => props.history.goBack()} className="back"><img src={back}  alt="back"/></span>
            <div className="round-dark">
                <h2>Payment by BTC</h2>
                <div className="amount label-payment"><span className="nowrap">Our BTC address</span><span style={{display: copied ? "block" : "none"}} className="green">Link is copied</span></div>
                <div className="refill-input">
                    <div className="input-wrap">
                        <input id='link' className="card-number" readOnly defaultValue="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2" type="text"/>
                    </div>
                </div>
                <div className="refill-btn">
                    <button onClick={copy} className="pay">COPY LINK</button>
                    <button onClick={() => {
                        props.history.push('/');
                    }} className="pay">GO TO MAIN</button>
                </div>
            </div>
        </div>
    );
};

export default Btc;
