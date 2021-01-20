import React, {useState} from 'react';
import './header.scss';
import logo from '../../images/logoLeft.svg';
import logo2 from '../../images/logoCentre.svg';
import burger from '../../images/burger.png';
import sound from '../../images/volume-up-solid.svg';
import noSound from '../../images/volume-mute-solid.svg';
import {connect} from "react-redux";
import {prohibition} from "../../redux/actions";
import {Link} from "react-router-dom";
import {muteToggle} from "../../redux/actions/music";

const Header = ({prohibition, auth, mute, muteToggle}) => {
    const [menu, setMenu] = useState(false);
    const handleMute = () => {
        muteToggle();
    }
    return (
        <div>
            <header className="header">
                <div className="wrap-header">
                    <nav className="navbar">
                        <Link className="navbar-brand" to="/">
                            <img src={logo} alt="logo" height="32"/>
                        </Link>
                    </nav>
                    <Link id="logoCentre" to="/">
                        <img className="mt-3" src={logo2} alt="logo" width="96"/>
                    </Link>
                    {/*<h4 style={auth ? {display: 'block'} : {display: 'none'}} className="text-center">Bitcoin Live price</h4>*/}
                    <div className="header-right">
                        <img onClick={handleMute} className="sound" src={mute ? sound : noSound} height="18" width="18"
                             alt="sound"/>
                        <div onMouseEnter={() => {
                            setMenu(true)
                        }}
                             onMouseLeave={() => {
                                 setMenu(false)
                             }}
                             style={auth ? {display: 'flex'} : {display: 'none'}} className="menu">
                            <img className="burger"
                                 src={burger} alt="icon"/>
                            <ul style={{display: menu ? 'block' : 'none'}} className="burger-menu">
                                <li className="burger-menu-item bord"><span>Create ad</span></li>
                                <li className="burger-menu-item bord"><span>Settings</span></li>
                                <li className="burger-menu-item bord"><span>My ads</span></li>
                                <li className="burger-menu-item" onClick={() => {
                                    localStorage.removeItem('token');
                                    prohibition();
                                    clearInterval();
                                }}><span>Log out</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
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
