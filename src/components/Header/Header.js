import React, {useState, useEffect} from 'react';
import './header.scss';
import logo from '../../images/logoLeft.svg';
// import logo2 from '../../images/logoCentre.svg';
import burger from '../../images/burger.png';
import refreshIcon from '../../images/refresh.svg';
import sound from '../../images/volume-up-solid.svg';
import noSound from '../../images/volume-mute-solid.svg';
import {connect} from "react-redux";
import {authorization, createAd, logoutQuestion, prohibition, registration} from "../../redux/actions";
import {Link} from "react-router-dom";
import {muteToggle} from "../../redux/actions/music";

const Header = ({auth, reg, mute, muteToggle, logoutQuestion, createAd, logout, registration, prohibition, authorization, history, unauthorized}) => {
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        authorization();
    }, [])
    const handleMute = () => {
        muteToggle();
    }
    const refresh = () => {
        window.location.reload();
    }
    return (
        <div>
            <header className="header">
                <div style={{display: logout ? "block" : "none"}} className="blur">
                    <div className="round-dark win">
                        <h2>Are you sure?</h2>
                        <div className="win-btn">
                            <button onClick={() => {
                                logoutQuestion();
                                localStorage.removeItem('token');
                                prohibition();
                                window.location.reload();
                            }} className="btn btn-primary"><Link to="/">LOG OUT</Link>
                            </button>
                            <button onClick={() => {
                                logoutQuestion();
                            }} className="btn btn-primary">STAY
                            </button>
                        </div>
                    </div>
                </div>
                <div className="wrap-header">
                    <nav className="navbar">
                        <a onClick={refresh} className="navbar-brand">
                            <img src={logo} alt="logo" height="23"/>
                        </a>
                    </nav>
                    <div className="header-right">
                        <img onClick={refresh} style={{marginRight: "30px"}} className="sound" height="18" width="18" src={refreshIcon} alt="refresh"/>
                        <img onClick={handleMute} className="sound " src={mute ? sound : noSound} height="18" width="18"
                             alt="sound"/>
                        {!auth ? <div className="startHeader">
                                 <Link onClick={() => {
                                     if(reg) {
                                         registration();
                                     }
                                 }} className="login" to="/login">LOG IN</Link>
                                 <Link onClick={registration} className="signup" to="/signup">SIGN UP</Link>
                             </div> : null }
                        <div onClick={(e) => {
                            setMenu(!menu)
                        }}
                             style={auth ? {display: 'flex'} : {display: 'none'}} className="menu">
                            <img className="burger"
                                 src={burger} alt="icon"/>
                            <ul style={{display: menu ? 'block' : 'none'}} className="burger-menu">
                                {/*<li className="burger-menu-item bord"><Link to="/ads">Create ad</Link></li>*/}
                                <li onClick={createAd} className="burger-menu-item bord">Create ad</li>
                                <li onClick={createAd} className="burger-menu-item bord"><span>My ads</span></li>
                                <li className="burger-menu-item" onClick={() => {
                                    logoutQuestion();
                                }}>Log out</li>
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
        reg: state.authReducer.reg,
        mute: state.soundReducer.mute,
        logout: state.authReducer.logoutQuestion,
        unauthorized: state.authReducer.unauthorized,
    }
}
const mapDispatchToProps = {
    muteToggle,
    logoutQuestion,
    createAd,
    registration,
    prohibition,
    authorization
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
