import React from "react";
import {connect} from "react-redux";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";

const App = ({auth, history}) => {
    return (
        <div className="App">
            {auth ? () => {
                history.push('/game')
                return <Main/>
            } : () => {
                history.push('/game')
                return <Auth />
            }}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth
    }
}
export default connect(mapStateToProps, null)(App);
