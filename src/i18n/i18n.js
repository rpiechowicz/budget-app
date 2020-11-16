import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import CustomBackend from './CustomBackend'
import LanguageDetector from 'i18next-browser-languagedetector'

const token = '1e56429bff2300d5e2b16d2de66db370'
const id = '390101'

i18n
	.use(CustomBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultLanguage: 'en',
		otherLanguage: ['pl'],
		fallbackLng: 'en',
		debug: true,
		saveMissing: true,

		backend: {
			loadPath: 'https://cors-anywhere.herokuapp.com/https://api.poeditor.com/v2/terms/list',
			addPath: 'https://cors-anywhere.herokuapp.com/https://api.poeditor.com/v2/terms/add',
			crossDomain: true,
			parse: data => {
				const parsedData = JSON.parse(data)
				const terms = parsedData.result.terms.reduce((acc, item) => {
					acc[item.term] = item.translation.content || item.term

					return acc
				}, {})

				return terms
			},
			parsePayload: (namespace, key) => {
				if (key === '_t') return

				const data = [
					{
						term: key,
					},
				]
				const payload = {
					api_token: token,
					data: JSON.stringify(data),
					id,
				}

				return payload
			},
			parseLoadPayload: ({ lng }) => {
				const payload = {
					api_token: token,
					language: lng,
					id,
				}

				return payload
			},
		},

		interpolation: {
			escapeValue: false,
		},
	})
