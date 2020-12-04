import React from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from 'utils'

import { CategoryItem as Root, CategoryAmount } from './BudgetCategoryList.css'

const CategoryItem = ({ name, item, transactions }) => {
	const {
		i18n: { language },
	} = useTranslation()

	const categoryTransations = transactions.filter(transation => transation.categoryId === item.id)
	const spentOnCategory = categoryTransations.reduce(
		(acc, transation) => acc + transation.amount,
		0
	)

	const totalLeft = item.budget - spentOnCategory

	return (
		<Root>
			<span>{name}</span>
			<CategoryAmount negative={Boolean(totalLeft < 0)}>
				{formatCurrency(totalLeft, language)}
			</CategoryAmount>
		</Root>
	)
}

export default CategoryItem
