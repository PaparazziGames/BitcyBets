import React from 'react';
import './header.scss';
import logo from '../../images/logo.svg';

const Header = () => {
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
            </header>
        </div>
    );
};

export default Header;
