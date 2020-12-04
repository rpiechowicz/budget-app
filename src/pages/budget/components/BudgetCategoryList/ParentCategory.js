import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ParentCategory as Root, CategoryAmount } from './BudgetCategoryList.css'
import { formatCurrency } from 'utils'

const ParentCategory = ({ name, onClick, categories, transactions, amount }) => {
	const {
		i18n: { language },
	} = useTranslation()

	const categoryLeftValue = useMemo(() => {
		if (!!amount) return null
		const budgeted = (() => {
			try {
				return categories.reduce((acc, category) => acc + category.budget, 0)
			} catch (error) {
				return null
			}
		})()

		const parentCategoryTransactions = transactions.filter(transaction => {
			return categories.find(category => category.categoryId === transaction.categoryId)
		})

		const spentOnParentCategory = parentCategoryTransactions.reduce(
			(acc, transation) => acc + transation.amount,
			0
		)

		const totalLeft = budgeted ? budgeted - spentOnParentCategory : null

		return totalLeft
	}, [categories, transactions, amount])

	const amountValue = useMemo(() => {
		return amount || categoryLeftValue
	}, [amount, categoryLeftValue])

	return (
		<Root onClick={onClick}>
			<span>{name}</span>
			<CategoryAmount negative={Boolean(amountValue < 0)}>
				{formatCurrency(amountValue, language)}
			</CategoryAmount>
		</Root>
	)
}

export default ParentCategory
