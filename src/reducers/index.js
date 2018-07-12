import { combineReducers } from 'redux';
import NotificationReducer from './NotificationReducer';
import SectionReducer from './SectionReducer';
import StudentReducer from './StudentReducer';

const reducer = combineReducers({
    notifications: NotificationReducer,
    sections: SectionReducer,
    students: StudentReducer
});

export default reducer;