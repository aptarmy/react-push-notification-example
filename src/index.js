import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import store from "./store";
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import notificationsAction from './actions/notifications';

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
notificationsAction.registerWorker();