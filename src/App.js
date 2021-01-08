import './App.scss';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import React, { Component } from "react";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {enter: true}
        this.toggleEnter = this.toggleEnter.bind(this)
    }
    toggleEnter(e) {
        e.preventDefault();
       this.setState(state=> ({...state, ...{enter: !this.state.enter}}))
    }
    render() {
        const { enter } = this.state;
        return (
            <div>
                <Header/>
                {enter ? <Auth toggleEnter={this.toggleEnter}/> : <Main/>}
            </div>
        );
    }
}

export default App;
