import { Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions'
import GlobalStyle from 'index.css'
import theme from 'utils/theme'

const App = ({ budget, fetchBudget, fetchBudgetedCategories }) => {
	useEffect(() => {
		fetchBudget(1)
		fetchBudgetedCategories(1)
	}, [fetchBudget, fetchBudgetedCategories])

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
							<Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>
								PL
							</Button>
							<Button variant="regular" onClick={() => i18n.changeLanguage('en')}>
								EN
							</Button>
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

const ConnectedApp = connect(
	state => {
		return {
			budget: state.budget.budget,
			common: state.common.allCategories,
		}
	},
	{
		fetchBudget,
		fetchBudgetedCategories,
	}
)(App)

const RootApp = () => {
	return (
		<ThemeProvider theme={theme}>
			<Suspense fallback={<LoadingIndicator />}>
				<ConnectedApp />
			</Suspense>
		</ThemeProvider>
	)
}

export default RootApp
