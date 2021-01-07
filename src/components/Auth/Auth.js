import React, {Component} from 'react';
import './auth.scss';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            pass: true
        }
        this.togglePass = this.togglePass.bind(this);
    }

    togglePass() {
        this.setState(state => ({...state, ...{pass: !this.state.pass}}));
    }

    render() {
        const {login, pass} = this.state
        if (login) {
            return (
                <div className="round-dark auth col-3">
                    <h2>Welcome</h2>
                    <form>
                        <div className="">
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" name="phone" type="tel" required/>
                        </div>
                        <div className={pass ? 'pass' : 'text'}>
                            <span onClick={this.togglePass} className="eye"/>
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type={pass ? 'password' : 'text'} required/>
                        </div>
                        <a className="forgot mb-3">Forgot password?</a>
                        <button>SIGN IN</button>
                        <span>or</span>
                        <button>REGISTER</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="round-dark auth">
                    <h2 className="">Registration</h2>
                </div>
            );
        }
    }
}

export default Auth;
