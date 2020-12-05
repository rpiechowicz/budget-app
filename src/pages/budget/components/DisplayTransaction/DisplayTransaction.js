import React, { useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { formatCurrency, formatDate } from 'utils'

import { selectDisplayTransaction } from 'data/actions/budget.actions'

const DisplayTransaction = ({
	transactions,
	selectedDisplayTransactionId,
	selectDisplayTransaction,
}) => {
	const {
		t,
		i18n: { language },
	} = useTranslation()

	useEffect(() => {
		return () => selectDisplayTransaction()
	})

	const currentTransaction = useMemo(
		() => transactions.find(transaction => transaction.id === selectedDisplayTransactionId),
		[transactions, selectedDisplayTransactionId]
	)

	console.log({ transactions, selectedDisplayTransactionId })

	return (
		<>
			{currentTransaction ? (
				<div>
					<h2>{currentTransaction.description}</h2>
					<div>
						{t('Amount')}: {formatCurrency(currentTransaction.amount, language)}
					</div>
					<div>
						{t('Date')}: {formatDate(currentTransaction.date, language)}
					</div>
				</div>
			) : (
				<div>error</div>
			)}
		</>
	)
}

export default connect(
	state => {
		return {
			transactions: state.budget.budget.transactions,
			selectedDisplayTransactionId: state.budget.selectedDisplayTransactionId,
		}
	},
	{ selectDisplayTransaction }
)(DisplayTransaction)
