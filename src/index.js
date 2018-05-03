import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { Provider } from './context';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
