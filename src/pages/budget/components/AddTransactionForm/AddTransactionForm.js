import React, { useMemo } from 'react'
import { Form, Field } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import { groupBy, noop } from 'lodash'

const required = value => (value ? undefined : 'This field is required!')

const AddTransactionFrom = ({ onSubmit = noop, categories, groupedCategoriesBy }) => {
	const { t } = useTranslation()

	const groupedCategoriesByParentName = useMemo(
		() => (groupedCategoriesBy ? groupBy(categories, groupedCategoriesBy) : null),
		[categories, groupedCategoriesBy]
	)

	const categoryItems = useMemo(
		() =>
			groupedCategoriesByParentName
				? Object.entries(groupedCategoriesByParentName).map(([parentName, categories]) => (
						<optgroup key={parentName} label={parentName}>
							{categories.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</optgroup>
				  ))
				: categories.map(category => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
				  )),
		[groupedCategoriesByParentName, categories]
	)

	return (
		<Form
			onSubmit={onSubmit}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={handleSubmit}>
					<Field name="description" validate={required}>
						{({ input, meta }) => (
							<div>
								<label>{t('Description')}</label>
								<input {...input} type="text" placeholder={t('Description')} />
								{meta.error && meta.touched && <span>{meta.error}</span>}
							</div>
						)}
					</Field>
					<Field name="amount" parse={value => parseFloat(value, 10)} validate={required}>
						{({ input, meta }) => (
							<div>
								<label>{t('Amount')}</label>
								<input {...input} type="number" step="0.1" placeholder={t('Amount')} />
								{meta.error && meta.touched && <span>{meta.error}</span>}
							</div>
						)}
					</Field>
					<Field name="categoryId" validate={required}>
						{({ input, meta }) => (
							<div>
								<label>{t('Category')}</label>
								<select {...input}>{categoryItems}</select>
								{meta.error && meta.touched && <span>{meta.error}</span>}
							</div>
						)}
					</Field>
					<Field name="date" validate={required}>
						{({ input, meta }) => (
							<div>
								<label>{t('Date')}</label>
								<input {...input} type="date" placeholder="Date" />
								{meta.error && meta.touched && <span>{meta.error}</span>}
							</div>
						)}
					</Field>

					<div className="buttons">
						<button type="submit" disabled={submitting}>
							{t('Submit')}
						</button>
						<button type="button" onClick={form.reset} disabled={submitting || pristine}>
							Reset
						</button>
					</div>
				</form>
			)}
		/>
	)
}

export default AddTransactionFrom
