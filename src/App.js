import React, {useEffect} from "react";
import {connect} from "react-redux";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import Playlist from "./sound/Playlist";

const App = ({auth}) => {
    useEffect(()=> {
        return localStorage.removeItem('token');
    }, [])
    return (
        <div className="App">
            <Playlist />
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
