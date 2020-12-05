import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { fetchBudget, fetchBudgetedCategories, addTransaction } from 'data/actions/budget.actions'
import { fetchAllCategories } from 'data/actions/common.actions'

import { Grid } from './Budget.css'
import { LoadingIndicator, Modal, Button } from 'components'

import BudgetCategoryList from 'pages/budget/components/BudgetCategoryList'
import BudgetTransactionList from 'pages/budget/components/BudgetTransactionList'
import AddTransactionForm from 'pages/budget/components/AddTransactionForm'

const Budget = ({
	commonState,
	budgetState,
	allCategories,
	budget,
	fetchBudget,
	fetchBudgetedCategories,
	fetchAllCategories,
	addTransaction,
}) => {
	useEffect(() => {
		fetchBudget(1)
		fetchBudgetedCategories(1)
		fetchAllCategories()
	}, [fetchBudget, fetchBudgetedCategories, fetchAllCategories])

	const { t } = useTranslation()
	const history = useHistory()

	const isLoaded = useMemo(
		() =>
			!!commonState &&
			Object.keys(commonState).length === 0 &&
			!!commonState &&
			Object.keys(budgetState).length === 0,
		[commonState, budgetState]
	)

	const handleSubmitAddTransaction = values => {
		addTransaction({
			budgetId: budget.id,
			data: values,
		}).then(() => history.goBack())
	}

	return (
		<section>
			<Grid>
				<section>{isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}</section>
				<section>
					{isLoaded ? (
						<>
							<Button to="/budget/transactions/new">{t('Add new transaction')}</Button>
							<BudgetTransactionList />
						</>
					) : (
						<LoadingIndicator />
					)}
				</section>
			</Grid>

			<Switch>
				<Route path="/budget/transactions/new">
					<Modal>
						<AddTransactionForm
							categories={allCategories}
							groupedCategoriesBy="parentCategory.name"
							onSubmit={handleSubmitAddTransaction}
						/>
					</Modal>
				</Route>
			</Switch>
		</section>
	)
}

export default connect(
	state => {
		return {
			budget: state.budget.budget,
			commonState: state.common.loadingState,
			budgetState: state.budget.loadingState,
			allCategories: state.common.allCategories,
		}
	},
	{
		fetchBudget,
		fetchBudgetedCategories,
		fetchAllCategories,
		addTransaction,
	}
)(Budget)
