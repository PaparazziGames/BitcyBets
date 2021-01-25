import React, {useState} from 'react';
import coin from '../../images/coin.svg';
import bitsybets from '../../images/BITCYBETS.svg';

const Preloader = ({show}) => {
    const [hide, setHide] = useState(0)
    const timerOpacity = setInterval(() => {
        setHide(hide + 700 > 2800 ? 700 : hide + 700)
        return clearInterval(timerOpacity);

    }, 500)
    if (!show) {
        return (
            <div style={show ? {display: 'none'} : {display: 'flex'}} className="load">
                <img src={bitsybets} alt=""/>
                <div className="wrap-img-preload">
                    <img style={{opacity: hide === 700 ? 1 : 0}} src={coin} alt=""/>
                    <img style={{opacity: hide === 1400 ? 1 : 0}} src={coin} alt=""/>
                    <img style={{opacity: hide === 2100 ? 1 : 0}} src={coin} alt=""/>
                    <img style={{opacity: hide === 2800 ? 1 : 0}} src={coin} alt=""/>
                </div>
            </div>
        );
    } else {
        return <div/>
    }
};

export default Preloader;
