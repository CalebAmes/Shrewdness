import React from 'react';

import './index.scss';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './assets/components/Modal';
import App from './App';

import configureStore from './assets/store';
import { restoreCSRF, csrfFetch } from './assets/store/csrf';
import * as sessionActions from './assets/store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);
