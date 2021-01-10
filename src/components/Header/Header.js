import React from 'react';
import './header.scss';
import logo from '../../images/logo.svg';
import ava from '../../images/ava.png';
import {connect} from "react-redux";
import {prohibition} from "../../redux/actions";

const Header = ({prohibition}) => {
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <a className="navbar-brand" href="https://google.com">
                        <img src={logo} alt="" width="32" height="32"
                             className="d-inline-block align-top" />
                            BITCY<span>BETS</span>
                    </a>
                </nav>
                <h4 className="text-center">Bitcoin Live price</h4>
                <img onClick={e => {
                    e.preventDefault();
                    prohibition();
                }} src={ava} alt="icon"/>
            </header>
        </div>
    );
};

const mapDispatchToProps = {
    prohibition
}
export default connect(null, mapDispatchToProps)(Header);
