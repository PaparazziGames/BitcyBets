import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import React from "react";
import {connect} from "react-redux";

const App = ({auth}) => {
    return (
        <div className="App">
            <Header />
            {auth ? <Main /> : <Auth />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth
    }
}
export default connect(mapStateToProps, null)(App);
