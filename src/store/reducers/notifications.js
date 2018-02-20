const initialState = {
	isBrowserSupported: undefined, // boolean
	isEnabledNotifications: undefined, // boolean
	isRegisteredWorker: undefined, // boolean
	vapidPublicKey: process.env.REACT_APP_VAPID_PUBLIC_KEY, // object
	serviceWorker: undefined, // object
	subscription: undefined // object
};

console.log("Vapid public key:", process.env.REACT_APP_VAPID_PUBLIC_KEY);

const notificationsReducer = (state = initialState, action) => {
	switch(action.type) {
		
		case "NOTIFICATION_UPDATE_BROWSER_SUPPORTED":
			return { ...state, isBrowserSupported: action.payload };
		
		case "NOTIFICATION_UPDATE_ENABLED_NOTIFICATION":
			return { ...state, isEnabledNotifications: action.payload };
		
		case "NOTIFICATION_UPDATE_REGISTERED_WORKER":
			return { ...state, isRegisteredWorker: action.payload };
		
		case "NOTIFICATION_UPDATE_SERVICE_WORKER":
			return { ...state, serviceWorker: action.payload }

		case "NOTIFICATION_UPDATE_SUBSCRIPTION":
			return { ...state, subscription: action.payload }
		
		default:
			return state;
	}
};

export default notificationsReducer;