import { Suspense } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import GlobalStyle from 'index.css'
import theme from 'utils/theme'

import 'react-toastify/dist/ReactToastify.css'

import { Navigation, Wrapper, LoadingIndicator, Button } from 'components'
import Budget from 'pages/budget'

const App = ({ budget, fetchBudget, fetchBudgetedCategories }) => {
	const { t, i18n } = useTranslation()
	toast.configure()

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
						<Route path="/budget">
							<Budget />
						</Route>
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
