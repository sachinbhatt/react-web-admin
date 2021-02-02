import { APP_DRAWER_OPEN, APP_DRAWER_CLOSE, DRAWER_LINK_CLICKED } from "./components/navigation/actionTypes";

const appInitState = {
	isDrawerOpen: false,
	activeDrawerLink: '',
}

export const appReducer = (state = appInitState, action) => {
	// console.log("PropertyReducer >> ", state, action);
	switch(action.type){
		case APP_DRAWER_OPEN:
			return {
				...state,
				isDrawerOpen: true
			};  
		case APP_DRAWER_CLOSE:
			return{
				...state,
				isDrawerOpen: false
			}
		case DRAWER_LINK_CLICKED:
			return {
				...state,
				activeDrawerLink: action.payload
			}
		default:
			return {...state};
	}
}
