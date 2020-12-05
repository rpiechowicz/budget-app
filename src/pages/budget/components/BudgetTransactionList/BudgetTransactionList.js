import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route } from 'react-router-dom'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import 'styled-components/macro'

import { selectDisplayTransaction } from 'data/actions/budget.actions'

import { Modal } from 'components'

import DisplayTransaction from 'pages/budget/components/DisplayTransaction'

import { List, ListItem } from './BudgetTransactionList.css'
import { formatCurrency, formatDate } from 'utils'

const BudgetTransactionList = ({
	transactions,
	allCategories,
	selectedParentCategoryId,
	budgetCategories,
	selectDisplayTransaction,
}) => {
	const {
		i18n: { language },
	} = useTranslation()

	const filteredTransationsBySelectedParentCategory = useMemo(() => {
		if (typeof selectedParentCategoryId === 'undefined') {
			return transactions
		}

		if (selectedParentCategoryId === null) {
			return transactions.filter(transaction => {
				const hasBudgetCategory = budgetCategories.some(
					budgetedCategory => budgetedCategory.categoryId === transaction.categoryId
				)

				return !hasBudgetCategory
			})
		}

		return transactions.filter(transaction => {
			try {
				const category = allCategories.find(category => category.id === transaction.categoryId)
				const parentCategoryName = category.parentCategory.name

				return parentCategoryName === selectedParentCategoryId
			} catch (error) {
				return false
			}
		})
	}, [allCategories, budgetCategories, selectedParentCategoryId, transactions])

	const groupedTransactions = useMemo(
		() =>
			groupBy(filteredTransationsBySelectedParentCategory, transaction =>
				new Date(transaction.date).getUTCDate()
			),
		[filteredTransationsBySelectedParentCategory]
	)

	const handleShowTransaction = id => {
		selectDisplayTransaction(id)
	}

	return (
		<>
			<List>
				{Object.entries(groupedTransactions).map(([key, transactions]) => (
					<li key={key}>
						<ul>
							{transactions.map(transaction => (
								<Link
									key={transaction.id}
									to={`/budget/transactions/show/${transaction.id}`}
									css={`
										text-decoration: none;
										color: black;
									`}
									onClick={() => handleShowTransaction(transaction.id)}
								>
									<ListItem key={transaction.id}>
										<div>{transaction.description}</div>
										<div>{formatCurrency(transaction.amount, language)}</div>
										<div>{formatDate(transaction.date, language)}</div>
										<div>
											{
												(
													allCategories.find(category => category.id === transaction.categoryId) ||
													{}
												).name
											}
										</div>
									</ListItem>
								</Link>
							))}
						</ul>
					</li>
				))}
			</List>

			<Switch>
				<Route path="/budget/transactions/show/">
					<Modal>
						<DisplayTransaction />
					</Modal>
				</Route>
			</Switch>
		</>
	)
}

export default connect(
	state => {
		return {
			transactions: state.budget.budget.transactions,
			budgetCategories: state.budget.budgetCategories,
			allCategories: state.common.allCategories,
			selectedParentCategoryId: state.budget.selectedParentCategoryId,
		}
	},
	{ selectDisplayTransaction }
)(BudgetTransactionList)
