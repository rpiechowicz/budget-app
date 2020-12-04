export const formatCurrency = (value, lang) => {
	const number = Number(value)

	return new Intl.NumberFormat(`${lang}`, {
		style: 'currency',
		currency: `${lang === 'pl' ? 'PLN' : 'USD'}`,
	}).format(number)
}

export const formatDate = (value, lang) => {
	const date = new Date(value)

	return new Intl.DateTimeFormat(`${lang}`).format(date)
}
