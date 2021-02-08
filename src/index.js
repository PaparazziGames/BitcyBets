import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./redux/store";
import Restore from "./components/Auth/restore";
import Refill from "./components/Refill/Refill";
import Btc from "./components/Refill/Btc";
import Usd from "./components/Refill/Usd";
import Header from "./components/Header/Header";
import Start from "./components/Start/Start";
import Support from "./components/Auth/Support";


render(
    <Provider store={store}>
        <Router>
            <Header />
            <Route exact path="/" component={Start}/>
            <Route exact path="/game" component={App}/>
            <Route path="/restore" component={Restore}/>
            <Route path="/refill" component={Refill}/>
            <Route path="/refill/btc" component={Btc}/>
            <Route path="/refill/usd" component={Usd}/>
            <Route path="/start" component={Start}/>
            <Route path="/support" component={Support}/>
            <Route path="/login" component={App}/>
            <Route path="/signup" component={App}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
