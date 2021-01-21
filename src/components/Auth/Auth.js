import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import './auth.scss';
import {authorization, registration} from "../../redux/actions";
import {User} from "../../api/User";

const Auth = ({reg, authorization, registration}) => {
    const [password, setPassword] = useState(true)
    const [passwordConfirm, setPasswordConfirm] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confpass, setConfpass] = useState('')
    const [err, setErr] = useState('')
    const clearData = () => {
        setName('');
        setPhone('');
        setEmail('');
        setPass('');
        setConfpass('');
        setErr('');
    }
    const handleSubmit = event => {
        event.preventDefault();

        const body = JSON.stringify({name, phone, email, pass, confpass});

        User.register(body)
            .then(res => res)
            .then(data => {
                return data.data.status === "success" ? registration() : data.data.error ? setErr(data.data.error) : false;
            })
            .catch(error => setErr(error.response.data.error))
    }

    const handleLogin = event => {
        event.preventDefault();
        const body = JSON.stringify({phone, pass});

        User.login(body)
            .then(res => res)
            .then(data => {
                    if (data.data.status === "success") {
                        const token = data.data.data.accessToken;
                        localStorage.setItem('token', token);
                        authorization();
                    } else if (data.data.error) {
                        setErr(data.data.error);
                    }
                }
            )
            .catch(error => setErr(error.response.data.error));
        authorization();
    }
    if (!reg) {
        return (
            <div className="round-dark auth">
                <h2>Welcome</h2>
                <form onSubmit={handleLogin}>
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <PhoneInput onChange={e => {
                            setPhone(e);
                            setErr('');
                        }} id="phone" limitMaxLength={true} placeholder='+123-456-78-90' value={phone} international displayInitialValueAsLocalNumber required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => setPassword(!password)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input onInput={e => {
                            setPass(e.target.value);
                            setErr('');
                        }} id="password" name="password"
                               type={password ? 'password' : 'text'} required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                    <Link to="/restore" className="forgot mb-3">Forgot password?</Link>
                    <button>SIGN IN</button>
                    <span>or</span>
                    <button onClick={e => {
                        e.preventDefault();
                        registration();
                        clearData();
                    }}>REGISTER
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="round-dark auth">
                <span onClick={() => {
                    registration();
                    clearData();
                }} className="back">&larr;</span><h2 className="">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="name">Name</label>
                        <input onChange={e => {
                            setName(e.target.value);
                            setErr('');
                        }}
                               value={name}
                               id="name" name="name" type="text" required/>
                    </div>
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <PhoneInput onChange={e => {
                            setPhone(e);
                            setErr('');
                        }} id="phone" limitMaxLength={true} placeholder='+123-456-78-90' value={phone} international displayInitialValueAsLocalNumber required/>
                    </div>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => {
                            setEmail(e.target.value);
                            setErr('');
                        }}
                               value={email}
                               id="email" name="email" type="email" required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => setPassword(!password)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input onChange={e => {
                            setPass(e.target.value);
                            setErr('');
                        }}
                               value={pass}
                               id="password" name="password" type={password ? 'password' : 'text'} required/>
                    </div>
                    <div className={passwordConfirm ? 'pass' : 'text'}>
                        <span onClick={() => setPasswordConfirm(!passwordConfirm)} className="eye"/>
                        <label htmlFor="passwordConfirm">Repeat password</label>
                        <input onChange={e => {
                            setConfpass(e.target.value);
                            setErr('');
                        }}
                               value={confpass}
                               id="passwordConfirm" name="passwordConfirm" type={passwordConfirm ? 'password' : 'text'}
                               required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
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
