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


render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={App}/>
            <Route path="/restore" component={Restore}/>
            <Route exact path="/refill" component={Refill}/>
            <Route exact path="/refill/btc" component={Btc}/>
            <Route exact path="/refill/usd" component={Usd}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
