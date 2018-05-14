import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

// Redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers';

import App from './components/App';
import SectionContainer from './components/SectionContainer';
import SectionListContainer from './components/SectionListContainer';

import './styles/index.css';

// Redux
const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App>
                <Switch>
                    <Route path='/section/:sectionId' component={SectionContainer}/>
                    <Route exact path='/' component={SectionListContainer}/>
                </Switch>
            </App>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
