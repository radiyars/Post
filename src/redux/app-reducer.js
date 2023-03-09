
const LOADER_DISPLAY_ON = 'POST/LOADER_DISPLAY_ON'
const LOADER_DISPLAY_OFF = 'POST/LOADER_DISPLAY_OFF'
const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON'
const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF'

const initialState = {
	isLoading: false,
	error: null
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADER_DISPLAY_ON:
			return {
				...state,
				isLoading: true
			}
		case LOADER_DISPLAY_OFF:
			return {
				...state,
				isLoading: false
			}
		case ERROR_DISPLAY_ON:
			return {
				...state,
				error: action.text
			}
		case ERROR_DISPLAY_OFF:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
}

export const loaderOn = () => ({ type: LOADER_DISPLAY_ON })
export const loaderOff = () => ({ type: LOADER_DISPLAY_OFF })
// export const errorOn = (text) => ({ type: LOADER_DISPLAY_OFF, text })
export const errorOn = (text) => {
	return dispatch => {
		dispatch({
			type: ERROR_DISPLAY_ON,
			text
		})
		setTimeout(() => {
			dispatch(errorOff())
		}, 2000)
	}
}
export const errorOff = () => ({ type: ERROR_DISPLAY_OFF })

