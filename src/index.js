import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from './redux/root-reducer';
import { Provider } from 'react-redux';


const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
