import React from 'react';
import coin from '../../images/coin.svg';
import bitsybets from '../../images/BITCYBETS.svg';

const Preloader = ({show}) => {
    return (
        <div style={show ? {display: 'none'} : {display: 'flex'}} className="load">
            <img src={bitsybets} alt=""/>
            <div className="wrap-img-preload">
            <img src={coin} alt=""/>
            <img src={coin} alt=""/>
            <img src={coin} alt=""/>
            <img src={coin} alt=""/>
            </div>
        </div>
    );
};

export default Preloader;
