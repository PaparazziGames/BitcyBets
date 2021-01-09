import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {userIn, showPassword, authorization} from "../../actions";

import './auth.scss';

class Auth extends Component {

    render() {

        const {isLogin, passShow, passRepeat, authIn} = this.props;
        const { pass, login, auth } = this.props;
        const togglePass = () => {
            let j = !passShow;
            pass(j);
        }
        const toggleLogin = (e) => {
            e.preventDefault();
            let i = !isLogin;
            login(i);
        }
        const toggleEntry = (e) => {
            e.preventDefault();
            let a = !authIn;
            auth(a);
        }
        if (!isLogin) {
            return (
                <div className="round-dark auth col-3">
                    <h2>Welcome</h2>
                    <form onSubmit={toggleEntry}>
                        <div className="">
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" name="phone" type="tel" required/>
                        </div>
                        <div className={passShow ? 'pass' : 'text'}>
                            <span onClick={togglePass} className="eye"/>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type={passShow ? 'password' : 'text'} required/>
                        </div>
                        <Link to="/restore" className="forgot mb-3">Forgot password?</Link>
                        <button>SIGN IN</button>
                        <span>or</span>
                        <button onClick={toggleLogin}>REGISTER</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="round-dark auth">
                    <span onClick={this.toggleLogin} className="back">&larr;</span><h2 className="">Registration</h2>
                    <form>
                        <div className="">
                            <label htmlFor="name">Name</label>
                            <input id="name" name="name" type="text" required/>
                        </div>
                        <div className="">
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" name="phone" type="tel" required/>
                        </div>
                        <div className="">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" required/>
                        </div>
                        <div className={passShow ? 'pass' : 'text'}>
                            <span onClick={this.togglePass} className="eye"/>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type={passShow ? 'password' : 'text'} required/>
                        </div>
                        <div className={passRepeat ? 'pass' : 'text'}>
                            <span onClick={this.togglePassRepeat} className="eye"/>
                            <label htmlFor="passwordRepeat">Repeat password</label>
                            <input id="passwordRepeat" name="passwordRepeat" type={passRepeat ? 'password' : 'text'}
                                   required/>
                        </div>
                        <button>REGISTER</button>
                    </form>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.userIn,
        passShow: state.showPassword,
        passRepeat: state.showPasswordRepeat
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (bool) => dispatch(userIn(bool)),
        pass: (bool) => dispatch(showPassword(bool)),
        auth: (bool) => dispatch(authorization(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
