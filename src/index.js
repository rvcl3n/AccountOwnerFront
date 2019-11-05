import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import repositoryReducer from './store/reducers/repositoryReducer';
import errorHandlerReducer from './store/reducers/errorHandlerReducer';
import authenticationReducer from './store/reducers/authenticationReducer';
import registrationReducer from './store/reducers/registrationReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
    authentication: authenticationReducer,
    registration: authenticationReducer,
    repository: repositoryReducer,
    errorHandler: errorHandlerReducer
})

const store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker();

