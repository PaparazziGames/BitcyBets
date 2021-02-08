import React, {useState} from 'react';
import './header.scss';
import logo from '../../images/logoLeft.svg';
// import logo2 from '../../images/logoCentre.svg';
import burger from '../../images/burger.png';
import sound from '../../images/volume-up-solid.svg';
import noSound from '../../images/volume-mute-solid.svg';
import {connect} from "react-redux";
import {createAd, logoutQuestion, prohibition, registration} from "../../redux/actions";
import {Link} from "react-router-dom";
import {muteToggle} from "../../redux/actions/music";

const Header = ({auth, reg, mute, muteToggle, logoutQuestion, createAd, registration, prohibition}) => {
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
                    {/*<Link id="logoCentre" to="/">*/}
                    {/*    <img className="mt-3" src={logo2} alt="logo" width="96"/>*/}
                    {/*</Link>*/}
                    {/*<h4 style={auth ? {display: 'block'} : {display: 'none'}} className="text-center">Bitcoin Live price</h4>*/}
                    <div className="header-right">
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
                                <li onClick={createAd} className="burger-menu-item bord"><span>Create ad</span></li>
                                <li onClick={createAd} className="burger-menu-item bord"><span>My ads</span></li>
                                <li className="burger-menu-item" onClick={() => {
                                    logoutQuestion();
                                    prohibition();
                                }}><Link to="/">Log out</Link></li>
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
        mute: state.soundReducer.mute
    }
}
const mapDispatchToProps = {
    muteToggle,
    logoutQuestion,
    createAd,
    registration,
    prohibition
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
