import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './i18n/i18n'
import './index.css.js'
import App from './App'
import configureStore from './data/store'

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>,
	document.getElementById('root')
)
