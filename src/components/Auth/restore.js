import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Restore extends Component {
    constructor(props) {
        super(props);
        this.state = {restore: true, userEmail: ''};
        this.toggleRestore = this.toggleRestore.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }
    toggleRestore(e) {
        e.preventDefault();
        this.setState(state => ({...state, ...{restore: false}}));
    }
    inputHandler(e) {
        this.setState(state => ({...state, ...{userEmail: e.target.value}}));
    }
    render() {
        const { restore } = this.state;
        const { history } = this.props;
        if (restore) {
            return (
                <div className="round-dark restore auth col-3">
                    <span onClick={() => history.push('/')} className="back restore-arrow">&larr;</span>
                    <form onSubmit={this.toggleRestore}>
                        <div>
                            <h2>Forgot password?</h2>
                            <label htmlFor="phone">E-mail</label>
                            <input onInput={this.inputHandler} placeholder="lucky@mail.com" id="phone" name="phone" type="email" required/>
                        </div>
                        <button>Send reset link</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="round-dark restore auth col-3">
                    <form onSubmit={e => e.preventDefault()}>
                        <h2>Link has been sent</h2>
                        <p>We have sent a reset link on your mail {this.state.userEmail}. Please, check your email and press the link</p>
                        <Link className="ok" to="/">Go to main</Link>
                    </form>
                </div>
            );
        }
    }

}

export default Restore;
