import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import './auth.scss';
import {authorization, registration} from "../../redux/actions";

const Auth = ({reg, authorization, registration}) => {
    const [pass, setPass] = useState(true)
    const [pass2, setPass2] = useState(true)
    if (!reg) {
        return (
            <div className="round-dark auth col-3">
                <h2>Welcome</h2>
                <form onSubmit={e => {
                    e.preventDefault();
                    authorization();
                }}>
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" required/>
                    </div>
                    <div className={pass ? 'pass' : 'text'}>
                        <span onClick={() => setPass(!pass)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type={pass ? 'password' : 'text'} required/>
                    </div>
                    <Link to="/restore" className="forgot mb-3">Forgot password?</Link>
                    <button>SIGN IN</button>
                    <span>or</span>
                    <button onClick={e => {
                        e.preventDefault();
                        registration();
                    }}>REGISTER</button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="round-dark auth">
                <span onClick={registration} className="back">&larr;</span><h2 className="">Registration</h2>
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
                        <span onClick={() => setPass(!pass)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type={pass ? 'password' : 'text'} required/>
                    </div>
                    <div className={pass2 ? 'pass' : 'text'}>
                        <span onClick={() => setPass2(!pass2)} className="eye"/>
                        <label htmlFor="passwordRepeat">Repeat password</label>
                        <input id="passwordRepeat" name="passwordRepeat" type={pass2 ? 'password' : 'text'}
                               required/>
                    </div>
                    <button>REGISTER</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reg: state.authReducer.reg
    }
}
const mapDispatchToProps = {
    authorization,
    registration
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
