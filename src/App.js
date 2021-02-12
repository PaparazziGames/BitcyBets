import React from "react";
import {connect} from "react-redux";
import Main from "./components/Main/Main";
import Auth from "./components/Auth/Auth";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Playlist from "./sound/Playlist";
import Start from "./components/Start/Start";
import Restore from "./components/Auth/restore";
import Reset from "./components/Auth/Reset";
import Refill from "./components/Refill/Refill";
import Btc from "./components/Refill/Btc";
import Usd from "./components/Refill/Usd";
import Support from "./components/Auth/Support";
import Ads from "./components/Ads/Ads";
import CompletePay from "./components/Refill/CompletePay";
import CompleteWith from "./components/Refill/CompleteWith";
import Withdraw from "./components/Refill/Withdraw";

const routing = [
    {path: "/", component: Start},
    {path: "/game", component: Main},
    {path: "/restore", component: Restore},
    {path: "/reset", component: Reset},
    {path: "/refill", component: Refill},
    {path: "/refill/btc", component: Btc},
    {path: "/refill/usd", component: Usd},
    {path: "/support", component: Support},
    {path: "/login", component: Auth},
    {path: "/signup", component: Auth},
    {path: "/ads", component: Ads},
    {path: "/complete/pay", component: CompletePay},
    {path: "/complete/withdraw", component: CompleteWith},
    {path: "/withdraw", component: Withdraw},
]
const App = ({unauthorized}) => {
    return (
        <Router>
            {/* eslint-disable-next-line no-restricted-globals */}
            <Header />
            <Playlist />
            {routing.map((content, index) => {
                return <Route key={index} exact path={content.path} component={content.component}/>
            })}
            <Redirect from="*" to={localStorage.getItem('token') ? "/game" : "/"} />
            {unauthorized ? <Redirect to='/login'/>: null};
        }
        </Router>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.auth,
        unauthorized: state.authReducer.unauthorized
    }
}
export default connect(mapStateToProps, null)(App);
