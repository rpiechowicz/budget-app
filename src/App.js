import { Navigation } from 'components'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalStyle from 'index.css'
import theme from 'utils/theme'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />

			<Router>
				<Navigation
					items={[
						{ content: 'Homepage', to: '/' },
						{ content: 'Budget', to: '/budget' },
					]}
				/>

				<Switch>
					<Route exact path="/">
						Home Page
					</Route>
					<Route path="/budget">Budget Page</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	)
}

export default App
