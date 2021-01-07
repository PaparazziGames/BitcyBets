import React, {Component} from 'react';
import './auth.scss';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            pass: false
        }
    }

    render() {
        const {login,pass} = this.state
        if (login) {
            return (
                <div className="round-dark auth  col-3">
                    <h2 className="">Welcome</h2>
                    <form>
                        <div className="">
                            <label htmlFor="phone">Phone</label>
                            <input name="phone" type="tel"/>
                        </div>
                        <div className="">
                            <label>Password</label>
                            <input name="password" type={pass ? 'password' : 'text'}/>
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
