const notificationsMiddleware = () => next => action => {
	if (/(.*)_(SUCCESS)/.test(action.type)) {
		console.log(action)
	}

	next(action)
}

export default notificationsMiddleware
