import React from 'react';
import click from './click.wav';

const Click = () => {
    return (
        <div className="click">
            <audio id="click" src={click}/>
        </div>
    );
};

export default Click;
