import { combineReducers } from 'redux';
import sectionReducer from './sectionReducer';

const reducer = combineReducers({
    sections: sectionReducer
});

export default reducer;