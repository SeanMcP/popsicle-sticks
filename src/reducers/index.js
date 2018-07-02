import { combineReducers } from 'redux';
import SectionReducer from './SectionReducer';

const reducer = combineReducers({
    sections: SectionReducer
});

export default reducer;