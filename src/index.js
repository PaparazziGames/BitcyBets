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


render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={App}/>
            <Route path="/restore" component={Restore}/>
            <Route path="/refill" component={Refill}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
