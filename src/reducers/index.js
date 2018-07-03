import { combineReducers } from 'redux';
import SectionReducer from './SectionReducer';
import StudentReducer from './StudentReducer';

const reducer = combineReducers({
    sections: SectionReducer,
    students: StudentReducer
});

export default reducer;