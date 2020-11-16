import { Suspense } from 'react'
import { Navigation, Wrapper, LoadingIndicator } from 'components'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GlobalStyle from 'index.css'
import theme from 'utils/theme'

const App = () => {
	const { t, i18n } = useTranslation()

	return (
		<>
			<GlobalStyle />

			<Router>
				<Navigation
					items={[
						{ content: t('Home Page'), to: '/' },
						{ content: t('Budget'), to: '/budget' },
					]}
					RightElement={
						<div>
							<button onClick={() => i18n.changeLanguage('pl')}>PL</button>
							<button onClick={() => i18n.changeLanguage('en')}>EN</button>
						</div>
					}
				/>
				<Wrapper>
					<Switch>
						<Route exact path="/">
							Home Page
						</Route>
						<Route path="/budget">Budget Page</Route>
					</Switch>
				</Wrapper>
			</Router>
		</>
	)
}

const RootApp = () => {
	return (
		<ThemeProvider theme={theme}>
			<Suspense fallback={<LoadingIndicator />}>
				<App />
			</Suspense>
		</ThemeProvider>
	)
}

export default RootApp
