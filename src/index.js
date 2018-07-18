import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
    connectRouter,
    ConnectedRouter,
    routerMiddleware
} from 'connected-react-router';
import registerServiceWorker from './registerServiceWorker';

// Redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducers';

import App from './components/App';
import RandomContainer from './containers/RandomContainer';
import SectionContainer from './containers/SectionContainer';
import ScheduleContainer from './containers/ScheduleContainer';
import StudentContainer from './containers/StudentContainer';

import './styles/_styles.css';

// Redux
const history = createBrowserHistory();
const store = createStore(
    connectRouter(history)(reducer),
    applyMiddleware(
        routerMiddleware(history),
        logger,
        reduxThunk
    )
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App>
                    <Switch>
                        <Route path='/section/:sectionId/random' component={RandomContainer}/>
                        <Route path='/section/:sectionId' component={SectionContainer}/>
                        <Route path='/student/:studentId' component={StudentContainer}/>
                        <Route exact path='/' component={ScheduleContainer}/>
                    </Switch>
                </App>
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
