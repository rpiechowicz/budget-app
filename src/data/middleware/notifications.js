import { toast } from 'react-toastify'

const notificationsMiddleware = () => next => action => {
	if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) {
		console.log(action)

		toast.success(action.successMessage, {
			position: 'top-right',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}

	next(action)
}

export default notificationsMiddleware
