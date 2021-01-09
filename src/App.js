import './App.scss';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import React, {Component} from "react";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        const {authIn} = this.props;
        return (
            <div>
                <Header/>
                {authIn ? <Auth/> : <Main/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authIn: state.authorization
    }
}
export default connect(mapStateToProps, null)(App);
