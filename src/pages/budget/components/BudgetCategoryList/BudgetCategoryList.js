import React, { useRef, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import { groupBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import 'styled-components/macro'

import { ToggleableList } from 'components'
import ParentCategory from './ParentCategory'
import CategoryItem from './CategoryItem'

import { selectParentCategory } from 'data/actions/budget.actions'

const BudgetCategoryList = ({ budgetCategories, allCategories, budget, selectParentCategory }) => {
	const { t } = useTranslation()
	const handleClickParentCategoryRef = useRef(null)

	const budgetCategoriesByParent = useMemo(
		() =>
			groupBy(
				budgetCategories,
				item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
			),
		[budgetCategories, allCategories]
	)

	const handleClearParentCategorySelect = useCallback(() => {
		selectParentCategory()
		handleClickParentCategoryRef.current()
	}, [selectParentCategory, handleClickParentCategoryRef])

	const handleSelectRestParentCategories = useCallback(() => {
		selectParentCategory(null)
		handleClickParentCategoryRef.current()
	}, [selectParentCategory, handleClickParentCategoryRef])

	const listItems = useMemo(
		() =>
			Object.entries(budgetCategoriesByParent).map(([parentName, categories]) => ({
				id: parentName,
				Trigger: ({ onClick }) => (
					<ParentCategory
						name={parentName}
						onClick={() => {
							onClick(parentName)
							selectParentCategory(parentName)
						}}
						categories={categories}
						transactions={budget.transactions}
					/>
				),
				children: categories.map(budgetCategory => {
					const name = allCategories.find(category => category.id === budgetCategory.categoryId)
						.name

					return (
						<CategoryItem
							key={name}
							name={name}
							item={budgetCategory}
							transactions={budget.transactions}
						/>
					)
				}),
			})),
		[allCategories, budget.transactions, budgetCategoriesByParent, selectParentCategory]
	)

	const totalSpent = useMemo(
		() => budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
		[budget.transactions]
	)
	const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [
		budget.totalAmount,
		totalSpent,
	])
	const amountTaken = useMemo(
		() =>
			budgetCategories.reduce((acc, budgetCategory) => {
				const categoryTransactions = budget.transactions.filter(
					transation => transation.categoryId === budgetCategory.id
				)
				const categoryExpenses = categoryTransactions.reduce(
					(acc, transation) => acc + transation.amount,
					0
				)

				return acc + Math.max(categoryExpenses, budgetCategory.budget)
			}, 0),
		[budget.transactions, budgetCategories]
	)

	const notBudgetTransactions = useMemo(
		() =>
			budget.transactions.filter(
				transaction =>
					!budgetCategories.find(budgetCategory => budgetCategory.id === transaction.id)
			),
		[budget.transactions, budgetCategories]
	)

	const notBudgetExpenses = useMemo(
		() => notBudgetTransactions.reduce((acc, transation) => acc + transation.amount, 0),
		[notBudgetTransactions]
	)

	const avaiableForestRestCategories = useMemo(
		() => budget.totalAmount - amountTaken - notBudgetExpenses,
		[budget.totalAmount, amountTaken, notBudgetExpenses]
	)

	return (
		<div>
			<div
				css={`
					border-bottom: 20px solid ${({ theme }) => theme.colors.gray.dark};
				`}
			>
				<ParentCategory
					name={budget.name}
					amount={restToSpent}
					onClick={handleClearParentCategorySelect}
				/>
			</div>

			<ToggleableList items={listItems} clickRef={handleClickParentCategoryRef} />
			<div
				css={`
					border-top: 20px solid ${({ theme }) => theme.colors.gray.dark};
				`}
			>
				<ParentCategory
					name={t('Other Categories')}
					amount={avaiableForestRestCategories}
					onClick={handleSelectRestParentCategories}
				/>
			</div>
		</div>
	)
}

export default connect(
	state => ({
		budgetCategories: state.budget.budgetCategories,
		allCategories: state.common.allCategories,
		budget: state.budget.budget,
	}),
	{ selectParentCategory }
)(BudgetCategoryList)
