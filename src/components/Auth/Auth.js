import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import './auth.scss';
import {authorization, betWin, registration} from "../../redux/actions";
import {User} from "../../api/User";
import {muteToggle, fireworks} from "../../redux/actions/music";

const Auth = ({reg, authorization, registration, muteToggle, mute, betWin, fireworks, history}) => {
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
        if (confpass.length < 8 || confpass.length < 8) {
            setErr('Password length must be 8 characters')
        } else {
            User.register(body)
                .then(res => res)
                .then(data => {
                    if (data.data.status === "success") {
                        localStorage.setItem('token', data.data.data.accessToken);
                        authorization();
                        history.push('/game');
                        if (!mute) {
                            muteToggle();
                        }
                        betWin();
                        fireworks();
                    } else {
                        if (data.data.error) {
                            setErr(data.data.error);
                        } else return false;
                    }
                })
                .catch(error => setErr(error.response.data.error))
        }
    }

    const handleLogin = event => {
        event.preventDefault();
        const body = JSON.stringify({phone, pass});

        User.login(body)
            .then(res => res)
            .then(data => {
                    if (data.data.status === "success") {
                        localStorage.setItem('token', data.data.data.accessToken);
                        history.push('/game');
                        return authorization();
                    } else if (data.data.error) {
                        return setErr(data.data.error);
                    } else {
                        return setErr('error, try again after 2-3 minutes')
                    }
                }
            )
            .catch(error => setErr(error.response.data.error));
        // authorization();
    }
    if (!reg) {
        return (
            <div className="round-dark auth">
               <span onClick={() => {
                   clearData();
               }} className="back"><Link to="/">&larr;</Link></span>
                <h2>Welcome</h2>
                <form onSubmit={handleLogin}>
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <PhoneInput onChange={e => {
                            setPhone(e);
                            setErr('');
                        }} id="phone" limitMaxLength={true} placeholder='+123-456-78-90' value={phone} international
                                    displayInitialValueAsLocalNumber required/>
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
                    }}>SIGN UP
                    </button>
                    <Link to="/support" className="support-link">Need support?</Link>
                </form>
            </div>
        );
    } else {
        return (
            <div className="round-dark auth">
                <span onClick={() => {
                    registration();
                    clearData();
                }} className="back">&larr;</span>
                <h2 className="">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="name">Name</label>
                        <input onChange={e => {
                            setName(e.target.value);
                            setErr('');
                        }}
                               value={name}
                               placeholder="John Lucky"
                               id="name" name="name" type="text" required/>
                    </div>
                    <div className="">
                        <label htmlFor="phone">Phone</label>
                        <PhoneInput onChange={e => {
                            setPhone(e);
                            setErr('');
                        }} id="phone" limitMaxLength={true} placeholder='+123-456-78-90' value={phone} international
                                    displayInitialValueAsLocalNumber required/>
                    </div>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => {
                            setEmail(e.target.value);
                            setErr('');
                        }}
                               value={email}
                               placeholder="lucky@mail.com"
                               id="email" name="email" type="email" required/>
                    </div>
                    <div className={password ? 'pass' : 'text'}>
                        <span onClick={() => setPassword(!password)} className="eye"/>
                        <label htmlFor="password">Password</label>
                        <input min='8' onChange={e => {
                            setPass(e.target.value);
                            setErr('');
                        }}
                               value={pass}
                               id="password" name="password" type={password ? 'password' : 'text'} required/>
                    </div>
                    <div className={passwordConfirm ? 'pass' : 'text'}>
                        <span onClick={() => setPasswordConfirm(!passwordConfirm)} className="eye"/>
                        <label htmlFor="passwordConfirm">Repeat password</label>
                        <input min='8' onChange={e => {
                            setConfpass(e.target.value);
                            setErr('');
                        }}
                               value={confpass}
                               id="passwordConfirm" name="passwordConfirm" type={passwordConfirm ? 'password' : 'text'}
                               required/>
                    </div>
                    <span style={{display: err ? 'block' : 'none'}} className="error red">{err}</span>
                    <button><Link to="/game">SIGN UP</Link></button>
                    <Link to='/support' className="support-link">Need support?</Link>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reg: state.authReducer.reg,
        mute: state.soundReducer.mute
    }
}
const mapDispatchToProps = {
    authorization,
    registration,
    muteToggle,
    betWin,
    fireworks
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
