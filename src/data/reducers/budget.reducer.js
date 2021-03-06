import {
	LOADING_STATES,
	BUDGET_GET_REQUEST,
	BUDGET_GET_SUCCESS,
	BUDGET_GET_FAILURE,
	BUDGETED_CATEGORIES_GET_REQUEST,
	BUDGETED_CATEGORIES_GET_SUCCESS,
	BUDGETED_CATEGORIES_GET_FAILURE,
	BUDGET_TRANSACTION_ADD_REQUEST,
	BUDGET_TRANSACTION_ADD_SUCCESS,
	SET_SELECTED_PARENT_CAREGORY_ID,
	SET_SELECTED_DISPLAY_TRANSACTION_ID,
} from 'data/constants'

const inictialState = {
	loadingState: null,
	budget: {},
	budgetCategories: [],
	selectedParentCategoryId: undefined,
}

const budget = (state = inictialState, action) => {
	const newLoadingState = { ...state.loadingState }

	switch (action.type) {
		case BUDGET_GET_REQUEST:
			return {
				...state,
				loadingState: {
					...state.loadingState,
					[action.type]: LOADING_STATES.LOADING,
				},
			}
		case BUDGET_GET_SUCCESS:
			delete newLoadingState.BUDGET_GET_REQUEST

			return {
				...state,
				budget: action.payload,
				loadingState: newLoadingState,
			}
		case BUDGET_GET_FAILURE:
			delete newLoadingState.BUDGET_GET_REQUEST

			return {
				...state,
				budget: {},
				loadingState: newLoadingState,
			}
		case BUDGETED_CATEGORIES_GET_REQUEST:
			return {
				...state,
				loadingState: {
					...state.loadingState,
					[action.type]: LOADING_STATES.LOADING,
				},
			}
		case BUDGETED_CATEGORIES_GET_SUCCESS:
			delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST

			return {
				...state,
				budgetCategories: action.payload,
				loadingState: newLoadingState,
			}
		case BUDGETED_CATEGORIES_GET_FAILURE:
			delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST

			return {
				...state,
				budgetCategories: {},
				loadingState: newLoadingState,
			}
		case SET_SELECTED_PARENT_CAREGORY_ID:
			return {
				...state,
				selectedParentCategoryId: action.payload,
			}
		case SET_SELECTED_DISPLAY_TRANSACTION_ID:
			return {
				...state,
				selectedDisplayTransactionId: action.payload,
			}
		case BUDGET_TRANSACTION_ADD_REQUEST: {
			return {
				...state,
				loadingState: {
					...state.loadingState,
					[action.type]: LOADING_STATES.LOADING,
				},
			}
		}
		case BUDGET_TRANSACTION_ADD_SUCCESS: {
			delete newLoadingState.BUDGET_TRANSACTION_ADD_REQUEST

			return {
				...state,
				budget: {
					...state.budget,
					transactions: [action.payload, ...state.budget.transactions],
				},
				loadingState: newLoadingState,
			}
		}
		default:
			return state
	}
}

export default budget
