import { Dispatch } from "react"

//	Actions CONST	---------------------------------------------------------------------------

const LOADER_DISPLAY_ON = 'POST/LOADER_DISPLAY_ON'
const LOADER_DISPLAY_OFF = 'POST/LOADER_DISPLAY_OFF'
const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON'
const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF'


//	Initial State & i'ts type	---------------------------------------------------------------

export type InitialStateType = {
	isLoading: boolean
	error: string | null
}

const initialState: InitialStateType = {
	isLoading: false,
	error: null
}

//	Reducer	-------------------------------------------------------------------------------------
export const appReducer = (state = initialState, action: AppReducerActionsTypes): InitialStateType => {
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


//	Actions	-----------------------------------------------------------------------------------

export type AppReducerActionsTypes = LoaderOnType | LoaderOffType | ErrorOnType | ErrorOffType


type LoaderOnType = {
	type: typeof LOADER_DISPLAY_ON
}
export const loaderOn = (): LoaderOnType => ({ type: LOADER_DISPLAY_ON })


type LoaderOffType = {
	type: typeof LOADER_DISPLAY_OFF
}
export const loaderOff = (): LoaderOffType => ({ type: LOADER_DISPLAY_OFF })


type ErrorOnType = {
	type: typeof ERROR_DISPLAY_ON
	text: string
}
export const errorOn = (text: string): ErrorOnType => ({ type: ERROR_DISPLAY_ON, text })


type ErrorOffType = {
	type: typeof ERROR_DISPLAY_OFF
}
export const errorOff = (): ErrorOffType => ({ type: ERROR_DISPLAY_OFF })


//	Thunks	------------------------------------------------------------------------------------

export const error = (text: string) => {
	return (dispatch: Dispatch<AppReducerActionsTypes>) => {
		dispatch(errorOn(text))
		setTimeout(() => {
			dispatch(errorOff())
		}, 2000)
	}
}


export const appActions = { loaderOn, loaderOff, errorOn, errorOff }