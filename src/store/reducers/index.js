import { combineReducers } from 'redux';

import notificationsReducer from './notifications';
import pagesReducers from './pages';

const rootReducer = combineReducers({
	notifications: notificationsReducer,
	pages: pagesReducers
});

export default rootReducer;