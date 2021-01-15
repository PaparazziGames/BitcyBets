import React from 'react';
import './header.scss';
import logo from '../../images/Logo2.svg';
import ava from '../../images/ava.png';
import {connect} from "react-redux";
import {prohibition} from "../../redux/actions";
import {Link} from "react-router-dom";

const Header = ({prohibition, auth}) => {
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" height="32"
                             className="d-inline-block align-top"/>
                        {/*BITCY<span>BETS</span>*/}
                    </Link>
                </nav>
                <h4 style={auth ? {display: 'block'} : {display: 'none'}} className="text-center">Bitcoin Live price</h4>
                <img className="ava" style={auth ? {display: 'block'} : {display: 'none'}} onClick={e => {
                    e.preventDefault();
                    prohibition();
                    window.location.href = '/';
                    clearInterval();
                }} src={ava} alt="icon"/>
            </header>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth
    }
}
const mapDispatchToProps = {
    prohibition
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
