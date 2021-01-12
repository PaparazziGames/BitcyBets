import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Restore extends Component {
    constructor(props) {
        super(props);
        this.state = {restore: true};
        this.toggleRestore = this.toggleRestore.bind(this);
    }
    toggleRestore(e) {
        e.preventDefault();
        this.setState(state => ({...state, ...{restore: false}}));
    }
    render() {
        const { restore } = this.state;
        if (restore) {
            return (
                <div className="round-dark restore auth col-3">
                    <form onSubmit={this.toggleRestore}>
                        <div>
                            <h2>Forgot password?</h2>
                            <label htmlFor="phone">E-mail</label>
                            <input placeholder="lucky@mail.com" id="phone" name="phone" type="email" required/>
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
                        <p>We have sent a reset link on your mail lucky@gmail.com. Please, check your email and press the link</p>
                        <Link className="ok" to="/">Go to main</Link>
                    </form>
                </div>
            );
        }
    }

}

export default Restore;
