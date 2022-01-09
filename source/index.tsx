import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import './public/scss/app.css';


ReactDOM.render(
    <React.StrictMode>
            <App />
    </React.StrictMode>, document.getElementById('root')
)

