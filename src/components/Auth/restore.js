import React, {Component} from 'react';
import {Link} from "react-router-dom";

let restore = true;
const toggleRestore = () => restore = true;

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
                <div className="round-dark auth col-3">
                    <form onSubmit={this.toggleRestore}>
                        <div>
                            <label htmlFor="phone">Enter your phone number</label>
                            <input id="phone" name="phone" type="tel" required/>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="round-dark auth col-3">
                    <form onSubmit={e => e.preventDefault()}>
                        <h2>Successfully</h2>
                        <Link className="ok" to="/">OK</Link>
                    </form>
                </div>
            );
        }
    }

}

export default Restore;
