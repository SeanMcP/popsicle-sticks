import { combineReducers } from 'redux';
import NotificationReducer from './NotificationReducer';
import SectionReducer from './SectionReducer';
import SessionReducer from './SessionReducer';
import StudentReducer from './StudentReducer';

const reducer = combineReducers({
    notifications: NotificationReducer,
    sections: SectionReducer,
    session: SessionReducer,
    students: StudentReducer
});

export default reducer;