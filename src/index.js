import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import saga from 'sagas/index';

import App from './App';

import { startAppHandler, renderDealers } from 'startApp';

import './style/utils.css';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const initApp = (dealers) => {
    const store = createStore(
        rootReducer,
        { dealers },
        enhancer
    );

    sagaMiddleware.run(saga);

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}

//==============================================================
// Create the event for launch app programmatically
window.eventAPP = new CustomEvent("app_load", {'detail': [] });
const btnStartApp = document.getElementById('start-btn');

btnStartApp.addEventListener('click', (e) => startAppHandler(e, initApp, 'form'))
document.addEventListener('app_load', (e) => startAppHandler(e, initApp));

// get and render dealers
renderDealers();
