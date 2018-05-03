import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from './context';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import ClassContainer from './components/ClassContainer';
import ClassListContainer from './components/ClassListContainer';

import './styles/index.css';

ReactDOM.render(
    <BrowserRouter>
        <Provider>
            <App>
                <Switch>
                    <Route path='/class' component={ClassContainer}/>
                    <Route exact path='/' component={ClassListContainer}/>
                </Switch>
            </App>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
