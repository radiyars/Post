import { Dispatch } from "react"
import { appApi } from "../api/app-api"
import { appType } from "../types/types"

//	Actions CONST	---------------------------------------------------------------------------

const LOADER_DISPLAY_ON = 'POST/LOADER_DISPLAY_ON'
const LOADER_DISPLAY_OFF = 'POST/LOADER_DISPLAY_OFF'
const ERROR_DISPLAY_ON = 'ERROR_DISPLAY_ON'
const ERROR_DISPLAY_OFF = 'ERROR_DISPLAY_OFF'
const SET_POST_ID = 'SET_POST_ID'


//	Initial State & i'ts type	---------------------------------------------------------------

const initialState: appType = {
	_id: '',
	isLoading: false,
	error: null,
}


//	Reducer	-------------------------------------------------------------------------------------
export const appReducer = (state = initialState, action: AppActionsTypes): appType => {
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

		case SET_POST_ID:
			return {
				...state,
				_id: action._id,
			}
		default:
			return state;
	}
}


//	Actions	-----------------------------------------------------------------------------------

export type AppActionsTypes = LoaderOnType | LoaderOffType | ErrorOnType | ErrorOffType | SetPostType


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


type SetPostType = {
	type: typeof SET_POST_ID
	_id: string
}
export const setPost = (_id: string): SetPostType => ({ type: SET_POST_ID, _id })


//	Thunks	------------------------------------------------------------------------------------

export const error = (text: string) => {
	return (dispatch: Dispatch<AppActionsTypes>) => {
		dispatch(errorOn(text))
		setTimeout(() => {
			dispatch(errorOff())
		}, 2000)
	}
}


export function getPostIdApi() {
	return async (dispatch: Dispatch<AppActionsTypes>) => {
		try {
			let data = await appApi.getPost()
			dispatch(setPost(data))
		} catch (err) {
			dispatch(errorOn(`Не удалось получить ID! ${err}`))
		}
	}
}


export const appActions = {
	getPostIdApi
}