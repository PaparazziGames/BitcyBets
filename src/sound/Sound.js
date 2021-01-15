import React, {useRef, useEffect} from 'react';
import {connect} from "react-redux";
import {stop} from '../redux/actions/music';

const Sound = ({play, param, stop}) => {
    const audRef = useRef(null);
    const handlePlay = () => {
        audRef.current.play();
        stop();
    }
    useEffect(() => {
        if (param.id === play) {
            handlePlay();
        }
        return stop();
    }, [param.id, play, handlePlay])
    return (
        <div className="sound">
            <audio ref={audRef} id={param.id} src={param.effect}/>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        play: state.soundReducer.play
    }
}
const mapDispatchToProps = {
    stop
}

export default connect(mapStateToProps, mapDispatchToProps)(Sound);
