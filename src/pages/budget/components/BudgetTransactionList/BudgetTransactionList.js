import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'

import { List, ListItem } from './BudgetTransactionList.css'
import { formatCurrency, formatDate } from 'utils'

const BudgetTransactionList = ({
	transactions,
	allCategories,
	selectedParentCategoryId,
	budgetCategories,
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

	return (
		<List>
			{Object.entries(groupedTransactions).map(([key, transactions]) => (
				<li key={key}>
					<ul>
						{transactions.map(transaction => (
							<ListItem key={transaction.id}>
								<div>{transaction.description}</div>
								<div>{formatCurrency(transaction.amount, language)}</div>
								<div>{formatDate(transaction.date, language)}</div>
								<div>
									{
										(allCategories.find(category => category.id === transaction.categoryId) || {})
											.name
									}
								</div>
							</ListItem>
						))}
					</ul>
				</li>
			))}
		</List>
	)
}

export default connect(state => ({
	transactions: state.budget.budget.transactions,
	budgetCategories: state.budget.budgetCategories,
	allCategories: state.common.allCategories,
	selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList)
