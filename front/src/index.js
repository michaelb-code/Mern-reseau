import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import {thunk} from 'redux-thunk'
import rootReducer from './reducers'

// dev tools
import {composeWithDevTools} from '@redux-devtools/extension'
import logger from 'redux-logger'
import { getAllUsers } from './actions/users.actions';


const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

store.dispatch(getAllUsers()) //permet de recuperer et de dispatcher toutes les donnees des users
// ca permet de puiser toutes les données des users

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  
);

