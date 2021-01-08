import React, {Component} from 'react';
import './auth.scss';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            pass: true,
            passRepeat: true
        }
        this.togglePass = this.togglePass.bind(this);
        this.togglePassRepeat = this.togglePassRepeat.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
    }

    togglePass() {
        this.setState(state => ({...state, ...{pass: !this.state.pass}}));
    }
    togglePassRepeat() {
        this.setState(state => ({...state, ...{passRepeat: !this.state.passRepeat}}));
    }
    toggleLogin() {
        this.setState(state => ({...state, ...{login: !this.state.login}}));
    }

    render() {
        const {login, pass, passRepeat} = this.state;
        const { toggleEnter } = this.props
        if (login) {
            return (
                <div className="round-dark auth col-3">
                    <h2>Welcome</h2>
                    <form onSubmit={toggleEnter}>
                        <div className="">
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" name="phone" type="tel" required/>
                        </div>
                        <div className={pass ? 'pass' : 'text'}>
                            <span onClick={this.togglePass} className="eye"/>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type={pass ? 'password' : 'text'} required/>
                        </div>
                        <span className="forgot mb-3">Forgot password?</span>
                        <button>SIGN IN</button>
                        <span>or</span>
                        <button  onClick={this.toggleLogin}>REGISTER</button>
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
                        <div className={pass ? 'pass' : 'text'}>
                            <span onClick={this.togglePass} className="eye"/>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type={pass ? 'password' : 'text'} required/>
                        </div>
                        <div className={passRepeat ? 'pass' : 'text'}>
                            <span onClick={this.togglePassRepeat} className="eye"/>
                            <label htmlFor="passwordRepeat">Repeat password</label>
                            <input id="passwordRepeat" name="passwordRepeat" type={passRepeat ? 'password' : 'text'} required/>
                        </div>
                        <button>REGISTER</button>
                    </form>
                </div>
            );
        }
    }
}

export default Auth;
