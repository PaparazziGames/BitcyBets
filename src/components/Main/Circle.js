import React, {useEffect} from 'react';

const draw = (rate, seconds) => {
    var canvas = rate === 'up' ? document.getElementById('canvasUp') : rate === 'down' ? document.getElementById('canvasDown') : null;
    if (canvas && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(100, 75, 42, 0, (2 * Math.PI) +  (2 * Math.PI * rate / 100));
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
    }
}

const Circle = ({timer}) => {
    useEffect(() => {
        draw(timer.rate, timer.counter)
    }, [draw, timer.rate])
    return (
        <div>
            {timer.rate ? <canvas style={{position: 'absolute', zIndex: '-1'}} id="canvasUp"/> : null}
            {timer.rate ? <canvas style={{position: 'absolute', zIndex: '-1'}} id="canvasDown"/> : null}
        </div>
    );
}

export default Circle;
