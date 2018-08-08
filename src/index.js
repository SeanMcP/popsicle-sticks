import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
    connectRouter,
    ConnectedRouter,
    routerMiddleware
} from 'connected-react-router';
// import PrivateRoute from './components/routing/PrivateRoute';
import registerServiceWorker from './registerServiceWorker';

// Redux imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger'
import reducer from './reducers';

import App from './components/App';
import GroupContainer from './containers/GroupContainer';
// import LoginContainer from './containers/LoginContainer';
import LoginContainerScratch from './containers/LoginContainerScratch';
import RandomContainer from './containers/RandomContainer';
import SectionContainer from './containers/SectionContainer';
import ScheduleContainer from './containers/ScheduleContainer';
import StudentContainer from './containers/StudentContainer';

import './styles/_styles.css';
import { PATH } from './constants';

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
                        <Route path={PATH.group} component={GroupContainer}/>
                        <Route path={PATH.random} component={RandomContainer}/>
                        <Route path={PATH.section} component={SectionContainer}/>
                        <Route path={PATH.student} component={StudentContainer}/>
                        <Route path={PATH.login} component={LoginContainerScratch}/>
                        <Route exact path={PATH.schedule} component={ScheduleContainer}/>
                    </Switch>
                </App>
            </ConnectedRouter>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
