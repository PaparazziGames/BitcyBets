import React, {useState} from 'react';
import back from "../../images/back.svg";
import add from "../../images/add_photo_alternate.svg";
import qrcode from "../../images/qrqcode.png";
import Header from "../Header/Header";

const Btc = (props) => {
    const [copied, setCopied] = useState(false);
    const copy = (e) => {
        setCopied(true);
        document.getElementById('link').select();
        document.execCommand('copy');
    }
    return (
        <div>
            <Header/>
            <div className="refill btc">

                <div className="round-dark">
                    <div className="qrcode">
                        <h2>Our BTC wallet</h2>
                        <img src={qrcode} alt="qr"/>
                    </div>
                    <span onClick={() => props.history.goBack()} className="back"><img src={back} alt="back"/></span>
                    <h2>Payment by BTC</h2>
                    <div className="amount label-payment"><span className="nowrap">Our BTC address</span><span
                        style={{display: copied ? "block" : "none"}} className="green">Link is copied</span></div>
                    <div className="refill-input">
                        <div className="input-wrap">
                            <input id='link' className="card-number" readOnly
                                   defaultValue="1FC2Jv4m2cEMi7RRzY34nNFgNkaDSonvcK" type="text"/>
                        </div>
                    </div>

                    <div className="refill-btn">
                        <button onClick={copy} className="pay">COPY LINK</button>
                        <div className="refill-btn">
                            <div className="">
                                <span className="nowrap">Upload payment screenshot</span>
                                <label className="label">
                                    <span className="drag">Drag and drop file here or</span>
                                    <img src={add} alt=""/>
                                    <span className="title">Choose file</span>
                                    <input type="file"/>
                                </label>
                            </div>
                        </div>
                        <div className="refill-input mt-5">
                            <div className="input-wrap">
                                <span className="nowrap">Transaction ID</span>
                                <input required name="trans" id='trans' className="card-number"
                                       placeholder="11223344"
                                       type="text"/>
                            </div>
                        </div>
                        <button type="submit" onClick={() => {
                        }} className="pay mt-5">SEND
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Btc;
