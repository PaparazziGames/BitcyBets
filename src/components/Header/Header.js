import React from 'react';
import './header.scss';
import logo from '../../images/Logo2.svg';
import ava from '../../images/ava.png';
import sound from '../../images/volume-up-solid.svg';
import noSound from '../../images/volume-mute-solid.svg';
import {connect} from "react-redux";
import {prohibition} from "../../redux/actions";
import {Link} from "react-router-dom";
import {muteToggle} from "../../redux/actions/music";

const Header = ({prohibition, auth, mute, muteToggle}) => {
    const handleMute = () => {
        muteToggle();
    }
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" height="32"
                             className="d-inline-block align-top"/>
                    </Link>
                </nav>
                <h4 style={auth ? {display: 'block'} : {display: 'none'}} className="text-center">Bitcoin Live price</h4>
                <img onClick={handleMute} className="sound" src={mute ? sound : noSound} height="25" width="25" alt="sound"/>
                <img className="ava" style={auth ? {display: 'block'} : {display: 'none'}} onClick={e => {
                    e.preventDefault();
                    prohibition();
                    clearInterval();
                }} src={ava} alt="icon"/>
            </header>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        mute: state.soundReducer.mute
    }
}
const mapDispatchToProps = {
    prohibition,
    muteToggle
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
