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
import SectionContainer from './containers/SectionContainer';
import ScheduleContainer from './containers/ScheduleContainer';
import StudentContainer from './containers/StudentContainer';

import './styles/index.css';

// Redux
const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App>
                <Switch>
                    <Route path='/section/:sectionId' component={SectionContainer}/>
                    <Route path='/student/:studentId' component={StudentContainer}/>
                    <Route exact path='/' component={ScheduleContainer}/>
                </Switch>
            </App>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
